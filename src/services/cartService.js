import { CartModel, ProductModel, UserModel } from "../models/index.js";

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

function normalizeImagePath(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
}

async function getAllCartItems() {
  return CartModel.findAll({
    include: [UserModel, ProductModel],
  });
}

async function getCartItemById(id) {
  return CartModel.findByPk(id, {
    include: [UserModel, ProductModel],
  });
}

async function getCartItemsByUser(userDni) {
  return CartModel.findAll({
    where: { user_dni: userDni },
    include: [UserModel, ProductModel],
  });
}

async function getCartViewData(userDni) {
  const cartItems = await CartModel.findAll({
    where: { user_dni: userDni },
    include: [ProductModel],
    order: [["id", "ASC"]],
  });

  const items = cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    subtotal: Number(item.total_amount || 0),
    subtotalFormatted: currencyFormatter.format(Number(item.total_amount || 0)),
    productName: item.Product?.name || "Producto sin nombre",
    productImage: normalizeImagePath(item.Product?.image),
  }));

  const totalGeneral = items.reduce((total, item) => total + item.subtotal, 0);

  return {
    userDni,
    items,
    isEmpty: items.length === 0,
    totalGeneralFormatted: currencyFormatter.format(totalGeneral),
  };
}

async function getCartItemByUserAndProduct(userDni, productId) {
  return CartModel.findOne({
    where: {
      user_dni: userDni,
      product_id: productId,
    },
  });
}

async function createCartItem(cartItemData) {
  return CartModel.create(cartItemData);
}

async function getCartItemRecordById(id) {
  return CartModel.findByPk(id);
}

async function updateCartItem(id, fieldsToUpdate) {
  const cartItem = await getCartItemRecordById(id);

  if (!cartItem) {
    return null;
  }

  await cartItem.update(fieldsToUpdate);
  return cartItem;
}

async function deleteCartItem(id) {
  return CartModel.destroy({
    where: { id },
  });
}

const functions = {
  createCartItem,
  deleteCartItem,
  getAllCartItems,
  getCartItemById,
  getCartItemByUserAndProduct,
  getCartItemRecordById,
  getCartItemsByUser,
  getCartViewData,
  updateCartItem,
};

export {
  createCartItem,
  deleteCartItem,
  getAllCartItems,
  getCartItemById,
  getCartItemByUserAndProduct,
  getCartItemRecordById,
  getCartItemsByUser,
  getCartViewData,
  updateCartItem,
};

export default functions;
