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

// Consulta base de todo el carrito con las relaciones necesarias para la API.
async function getAllCartItems() {
  return CartModel.findAll({
    include: [UserModel, ProductModel],
  });
}

// Recupera un item concreto del carrito manteniendo la misma forma enriquecida.
async function getCartItemById(id) {
  return CartModel.findByPk(id, {
    include: [UserModel, ProductModel],
  });
}

// Filtra el carrito por usuario sin duplicar los includes en el controlador.
async function getCartItemsByUser(userDni) {
  return CartModel.findAll({
    where: { user_dni: userDni },
    include: [UserModel, ProductModel],
  });
}

// Devuelve los datos completos para renderizar el sidebar del carrito.
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

// Recupera un item del carrito para un usuario y producto específico.
async function getCartItemByUserAndProduct(userDni, productId) {
  return CartModel.findOne({
    where: {
      user_dni: userDni,
      product_id: productId,
    },
  });
}

// Crea un nuevo registro de carrito sin acoplar el service a la capa HTTP.
async function createCartItem(cartItemData) {
  return CartModel.create(cartItemData);
}

// Recupera el registro base para operaciones de escritura como update.
async function getCartItemRecordById(id) {
  return CartModel.findByPk(id);
}

// Aplica un patch parcial sobre un item existente del carrito.
async function updateCartItem(id, fieldsToUpdate) {
  const cartItem = await getCartItemRecordById(id);
  return cartItem.update(fieldsToUpdate);
}

// Elimina un item por id y devuelve cuántas filas se han borrado.
async function deleteCartItem(id) {
  return CartModel.destroy({
    where: { id },
  });
}

async function removeFromCart(user_dni, product_id) {
  return await Cart.destroy({ where: { user_dni, product_id } });
};

export const functions = {
  createCartItem,
  deleteCartItem,
  getAllCartItems,
  getCartItemById,
  getCartViewData,
  getCartItemByUserAndProduct,
  getCartItemRecordById,
  getCartItemsByUser,
  updateCartItem,
  removeFromCart
};

export default functions;