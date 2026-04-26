import { CartModel, ProductModel } from "../../models/index.js";
import cartService from "../../services/cartService.js";
import productServices from "../../services/productServices.js";

async function getCartItems() {
  const cartItems = await cartService.getAllCartItems();
  res.json(cartItems);
}

async function createCartItem(req, res) {
  const product = await productServices.getProductById(req.body.productId);
  const cartItem = await cartService.getCartItemByUserAndProduct(
    req.body.userDni || '12345678A',
    req.body.productId,
  );

  if (cartItem) {
    const newQuantity = Number(cartItem.quantity) + Number(req.body.quantity);
    const newTotalAmount = Number(product.price) * Number(newQuantity);
    await cartService.updateCartItem(cartItem.id, {
      quantity: newQuantity,
      total_amount: newTotalAmount,
    });
  } else {
    await cartService.createCartItem({
      user_dni: req.body.userDni || '12345678A',
      product_id: req.body.productId,
      quantity: Number(req.body.quantity),
      total_amount: Number(product.price) * Number(req.body.quantity),
    });
  }
  res.redirect(`/${req.headers.referer.split('/').pop()}`);
}

async function getAllCartItems(req, res) {
  const cartItems = await cartService.getAllCartItems();

};

async function getAllViewCartItems(req, res) {
  const cartItems = await cartService.getAllCartItems();
  res.render("dashboard/cart/cart", { cartItems, layout: "layouts/dashboard" });

};

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
  const { id } = req.params;
  const deletedRows = await cartService.deleteCartItem(id);

  return res.redirect('/admin/cart');

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
};

export default cartViewController;
