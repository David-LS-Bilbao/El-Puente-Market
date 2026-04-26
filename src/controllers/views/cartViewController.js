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
    req.body.userDni,
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
      user_dni: req.body.userDni,
      product_id: req.body.productId,
      quantity: Number(req.body.quantity),
      total_amount: Number(product.price) * Number(req.body.quantity),
    });
  }
  res.redirect(`/${req.headers.referer.split('/').pop()}`);
}

async function deleteCartItem(req, res) {
  const cartItem = await cartService.deleteCartItem(req.body.userDni, req.body.productId);
  res.redirect("/");
}

export const cartViewController = {
  getCartItems,
  createCartItem,
  deleteCartItem,
};
export default cartViewController;
