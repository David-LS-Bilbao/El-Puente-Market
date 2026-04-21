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

export { getAllCartItems, getCartItemById, getCartItemsByUser };
