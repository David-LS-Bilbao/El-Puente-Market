import { CartModel, ProductModel, UserModel } from "../../models/index.js";

const cartController = {
  async getAllCartItems(req, res) {
    try {
      // Recupera todos los registros del carrito junto con el usuario y el producto asociados.
      const cartItems = await CartModel.findAll({
        include: [UserModel, ProductModel],
      });

      // Devuelve la colección completa al cliente.
      return res.status(200).json(cartItems);
    } catch (error) {
      // Responde con error de servidor si falla la consulta.
      return res.status(500).json({
        message: "Error al obtener los elementos del carrito",
        error: error.message,
      });
    }
  },

  async getCartByUser(req, res) {
    try {
      // Obtiene el identificador del usuario desde la URL.
      const { userDni } = req.params;

      // Busca solo los elementos del carrito que pertenecen al usuario indicado.
      const cartItems = await CartModel.findAll({
        where: { user_dni: userDni },
        include: [UserModel, ProductModel],
      });

      // Devuelve el carrito del usuario, aunque esté vacío.
      return res.status(200).json(cartItems);
    } catch (error) {
      // Centraliza el fallo de lectura en una respuesta 500.
      return res.status(500).json({
        message: "Error al obtener el carrito del usuario",
        error: error.message,
      });
    }
  },

  async createCartItem(req, res) {
    try {
      const {
        user_dni,
        product_id,
        quantity = 1,
        updated_at,
        total_amount,
        created_at,
      } = req.body;

      if (!user_dni || product_id == null || total_amount == null) {
        return res.status(400).json({
          message: "Faltan datos obligatorios para crear el elemento del carrito",
        });
      }

      const newCartItem = await CartModel.create({
        user_dni,
        product_id,
        quantity,
        updated_at: updated_at || null,
        total_amount,
        created_at: created_at || new Date(),
      });

      return res.status(201).json({
        message: "Elemento del carrito creado correctamente",
        data: newCartItem,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al crear el elemento del carrito",
        error: error.message,
      });
    }
  },

  async deleteCartItem(req, res) {
    try {
      // Lee el identificador unico del elemento del carrito a eliminar.
      const { id } = req.params;

      // Elimina el registro que coincide con la clave primaria del carrito.
      const deletedRows = await CartModel.destroy({
        where: { id },
      });

      // Si no se eliminó ninguna fila, el recurso no existía.
      if (!deletedRows) {
        return res.status(404).json({
          message: "No se encontró el elemento del carrito para eliminar",
        });
      }

      // Confirma la eliminación cuando la operación se completa correctamente.
      return res.status(200).json({
        message: "Elemento del carrito eliminado correctamente",
      });
    } catch (error) {
      // Captura errores inesperados durante el borrado.
      return res.status(500).json({
        message: "Error al eliminar el elemento del carrito",
        error: error.message,
      });
    }
  },
};

export default cartController;
