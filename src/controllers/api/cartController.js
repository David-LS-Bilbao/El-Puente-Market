import cartService from '../../services/cartService.js'

async function getAllCartItems(req, res) {
  const cartItems = await cartService.getAllCartItems();
  return res.status(200).json(cartItems);
};

async function getCartItemById(req, res) {
  const { id } = req.params;
  const cartItem = await cartService.getCartItemById(id);
};

async function getCartByUser(req, res) {
  const { userDni } = req.params;
  const cartItems = await cartService.getCartItemsByUser(userDni);
  return res.status(200).json(cartItems);
};

async function createCartItem(req, res) {
  const { user_dni, product_id, quantity = 1, total_amount } = req.body ?? {};

  return res.status(201).json({
    message: "Elemento del carrito creado correctamente",
    data: newCartItem
  });
};

async function updateCartItem(req, res) {
  const { id } = req.params;
  const { user_dni, product_id, quantity } = req.body ?? {};

  const cartItem = await cartService.getCartItemRecordById(id);

  const product = await ProductModel.findByPk(effectiveProductId);
  if (!product) {
    return res.status(400).json({ message: "Producto no encontrado" });
  }
  const unitPrice =
    product.on_discount && product.price_discount != null
      ? Number(product.price_discount)
      : Number(product.price);
  fieldsToUpdate.total_amount = (unitPrice * effectiveQuantity).toFixed(2);
  fieldsToUpdate.updated_at = new Date();

  await updateCartItem(id, fieldsToUpdate);

  const updatedCartItem = await CartModel.findByPk(id, {
    include: [UserModel, ProductModel],
  });

  return res.status(200).json({
    message: "Elemento del carrito actualizado correctamente",
    data: updatedCartItem,
  });
};

async function deleteCartItem(req, res) {
  const { id } = req.params;
  const deletedRows = await cartService.deleteCartItem(id);

  // Confirma la eliminación cuando la operación se completa correctamente.
  return res.status(200).json({
    message: "Elemento del carrito eliminado correctamente",
  });
};

export const cartController = {
  getAllCartItems,
  getCartItemById,
  getCartByUser,
  createCartItem,
  updateCartItem,
  deleteCartItem
};

export default cartController;