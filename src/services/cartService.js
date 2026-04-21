import { CartModel, ProductModel, UserModel } from "../models/index.js";

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

  if (!cartItem) {
    return null;
  }

  await cartItem.update(fieldsToUpdate);
  return cartItem;
}

// Elimina un item por id y devuelve cuántas filas se han borrado.
async function deleteCartItem(id) {
  return CartModel.destroy({
    where: { id },
  });
}

export {
  createCartItem,
  deleteCartItem,
  getAllCartItems,
  getCartItemById,
  getCartItemRecordById,
  getCartItemsByUser,
  updateCartItem,
};
