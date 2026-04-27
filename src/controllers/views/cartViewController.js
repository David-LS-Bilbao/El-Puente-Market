import { CartModel, ProductModel } from "../../models/index.js";
import cartService from "../../services/cartService.js";
import productServices from "../../services/productServices.js";

async function getCartItems(req, res) {
  const cartItems = await cartService.getAllCartItems();
  res.json(cartItems);
}

async function createCartItem(req, res) {
  const product = await productServices.getProductById(req.body.productId);
  if (!product) {
    return res.status(404).redirect(req.get("referer") || "/");
  }

  const userDni = req.body.userDni || req.body.user_dni || req.session?.user?.dni;
  if (!userDni) {
    return res.redirect("/auth/login?message=Debes iniciar sesión para usar el carrito");
  }
  const quantityToAdd = Number(req.body.quantity) || 1;
  const unitPrice = product.on_discount && product.price_discount != null
    ? Number(product.price_discount)
    : Number(product.price);

  const cartItem = await cartService.getCartItemByUserAndProduct(
    userDni,
    req.body.productId,
  );

  if (cartItem) {
    const newQuantity = Number(cartItem.quantity) + quantityToAdd;
    if (newQuantity <= 0) {
      await cartService.deleteCartItem(cartItem.id);
    } else {
      const newTotalAmount = unitPrice * Number(newQuantity);
      await cartService.updateCartItem(cartItem.id, {
        quantity: newQuantity,
        total_amount: newTotalAmount,
      });
    }
  } else {
    await cartService.createCartItem({
      user_dni: userDni,
      product_id: req.body.productId,
      quantity: quantityToAdd,
      total_amount: unitPrice * quantityToAdd,
    });
  }
  return res.redirect(req.get("referer") || "/");
}

async function getAllCartItems(req, res) {
  const cartItems = await cartService.getAllCartItems();

};

async function getAllViewCartItems(req, res) {
  const cartItems = await cartService.getAllCartItems();
  res.render("dashboard/cart/cart", { cartItems, layout: "layouts/dashboard" });

};

async function getCheckout(req, res) {
  const userDni = req.session?.user?.dni;
  if (!userDni) {
    return res.redirect("/auth/login?message=Debes iniciar sesión para pagar");
  }

  const cartSidebar = await cartService.getCartViewData(userDni);
  return res.render("pages/checkout", {
    cartSidebar,
    userDni,
    categories: [],
    activeCategoryId: null,
    layout: "layouts/main"
  });
}

async function simulateCheckout(req, res) {
  const userDni = req.session?.user?.dni;
  if (!userDni) {
    return res.redirect("/auth/login?message=Debes iniciar sesión para pagar");
  }

  const cartSidebar = await cartService.getCartViewData(userDni);
  if (cartSidebar.isEmpty) {
    return res.redirect("/?message=Tu carrito ya está vacío");
  }

  await cartService.clearCartByUser(userDni);

  return res.render("pages/checkout-success", {
    paidItems: cartSidebar.items,
    totalGeneralFormatted: cartSidebar.totalGeneralFormatted,
    userDni,
    categories: [],
    activeCategoryId: null,
    layout: "layouts/main"
  });
}

async function updateCartItem(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await cartService.getCartItemRecordById(id);

    if (!cartItem) {
      return res.status(404).send("Ítem del carrito no encontrado");
    }

    const product = await ProductModel.findByPk(cartItem.product_id);

    const unitPrice = product.on_discount && product.price_discount != null
      ? Number(product.price_discount)
      : Number(product.price);

    const fieldsToUpdate = {
      quantity: Number(quantity),
      total_amount: (unitPrice * Number(quantity)).toFixed(2),
      updated_at: new Date()
    };

    await cartService.updateCartItem(id, fieldsToUpdate);

    return res.redirect('/admin/cart');
  } catch (error) {
    console.error("Error en updateCartItem:", error);
    res.status(500).send("Error al actualizar el carrito");
  }
}

async function deleteCartItem(req, res) {
  if (req.params.id) {
    await cartService.deleteCartItem(req.params.id);
    return res.redirect('/admin/cart');
  }

  const userDni = req.body.userDni || req.body.user_dni || req.session?.user?.dni;
  const productId = req.body.productId;

  if (!userDni) {
    return res.status(401).json({ message: "Debes iniciar sesión para usar el carrito" });
  }

  if (!productId) {
    return res.status(400).json({ message: "productId es obligatorio" });
  }

  const cartItem = await cartService.getCartItemByUserAndProduct(userDni, productId);
  if (!cartItem) {
    return res.status(404).json({ message: "Ítem del carrito no encontrado" });
  }

  await cartService.deleteCartItem(cartItem.id);
  return res.status(200).json({ ok: true });
};

async function getViewEditCart(req, res) {
  const cart = await cartService.getCartItemById(req.params.id);

  res.render('dashboard/cart/editCart', {
    cart,
    layout: 'layouts/dashboard'
  });
}


export const cartViewController = {
  getAllCartItems,
  updateCartItem,
  deleteCartItem,
  getAllViewCartItems,
  getViewEditCart,
  getCartItems,
  createCartItem,
  getCheckout,
  simulateCheckout,
};

export default cartViewController;
