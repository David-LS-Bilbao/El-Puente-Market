import { CartModel, ProductModel } from "../../models/index.js";
import cartService from "../../services/cartService.js";

async function renderCartSidebar(req, res) {
  try {
    const { userDni } = req.params;
    const cartViewData = await cartService.getCartViewData(userDni);

    return res.render("partials/cart-sidebar", {
      layout: false,
      ...cartViewData,
    });
  } catch (error) {
    return res.status(500).send("No se pudo cargar el sidebar del carrito");
  }
}

async function deleteCartItemAndRedirect(req, res) {
  try {
    const { userDni, id } = req.params;
    const cartItem = await CartModel.findOne({
      where: {
        id,
        user_dni: userDni,
      },
    });

    if (!cartItem) {
      return res.status(404).send("No se encontró la linea del carrito");
    }

    await cartItem.destroy();

    return res.redirect("/");
  } catch (error) {
    return res.status(500).send("No se pudo eliminar la linea del carrito");
  }
}

async function getAllViewCartItems(req, res) {
  const cartItems = await cartService.getAllCartItems();
  res.render("dashboard/cart/cart", { cartItems, layout: "layouts/dashboard" });
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
    const unitPrice =
      product.on_discount && product.price_discount != null
        ? Number(product.price_discount)
        : Number(product.price);

    await cartService.updateCartItem(id, {
      quantity: Number(quantity),
      total_amount: (unitPrice * Number(quantity)).toFixed(2),
      updated_at: new Date(),
    });

    return res.redirect("/admin/cart");
  } catch (error) {
    console.error("Error en updateCartItem:", error);
    return res.status(500).send("Error al actualizar el carrito");
  }
}

async function deleteCartItem(req, res) {
  const { id } = req.params;
  await cartService.deleteCartItem(id);

  return res.redirect("/admin/cart");
}

async function getViewEditCart(req, res) {
  const cart = await cartService.getCartItemById(req.params.id);

  res.render("dashboard/cart/editCart", {
    cart,
    layout: "layouts/dashboard",
  });
}

const cartViewController = {
  renderCartSidebar,
  deleteCartItemAndRedirect,
  getAllViewCartItems,
  updateCartItem,
  deleteCartItem,
  getViewEditCart,
};

export default cartViewController;
