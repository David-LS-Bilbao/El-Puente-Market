import {
  createCartItem,
  deleteCartItem,
  getAllCartItems,
  getCartItemById,
  getCartItemRecordById,
  getCartItemsByUser,
  updateCartItem,
} from "../../services/cartService.js";

const cartController = {
  async getAllCartItems(req, res) {
    try {
      // Recupera todos los registros del carrito junto con sus relaciones.
      const cartItems = await getAllCartItems();

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

  async getCartItemById(req, res) {
    try {
      const { id } = req.params;

      const cartItem = await getCartItemById(id);

      if (!cartItem) {
        return res.status(404).json({
          message: "No se encontró el elemento del carrito",
        });
      }

      return res.status(200).json(cartItem);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener el elemento del carrito",
        error: error.message,
      });
    }
  },

  async getCartByUser(req, res) {
    try {
      // Obtiene el identificador del usuario desde la URL.
      const { userDni } = req.params;

      // Busca solo los elementos del carrito que pertenecen al usuario indicado.
      const cartItems = await getCartItemsByUser(userDni);

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
      // Protege frente a requests sin body parseado y permite validar de forma uniforme.
      const requestBody = req.body ?? {};
      const {
        user_dni,
        product_id,
        quantity = 1,
        updated_at,
        total_amount,
        created_at,
      } = requestBody;

      if (!user_dni || product_id == null || total_amount == null) {
        return res.status(400).json({
          message: "Faltan datos obligatorios para crear el elemento del carrito",
        });
      }

      // Persiste el item solo cuando las referencias y valores ya son consistentes.
      const newCartItem = await createCartItem({
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

  async updateCartItem(req, res) {
    try {
      const { id } = req.params;
      // Permite responder 400 si el cliente no ha enviado datos actualizables.
      const requestBody = req.body ?? {};
      const {
        user_dni,
        product_id,
        quantity,
        total_amount,
        updated_at,
      } = requestBody;

      const cartItem = await getCartItemRecordById(id);

      if (!cartItem) {
        return res.status(404).json({
          message: "No se encontró el elemento del carrito para actualizar",
        });
      }

      // Construye un patch parcial para no sobrescribir campos ausentes.
      const fieldsToUpdate = {};

      if (user_dni !== undefined) fieldsToUpdate.user_dni = user_dni;
      if (product_id !== undefined) fieldsToUpdate.product_id = product_id;
      if (quantity !== undefined) fieldsToUpdate.quantity = quantity;
      if (total_amount !== undefined) fieldsToUpdate.total_amount = total_amount;

      if (!Object.keys(fieldsToUpdate).length && updated_at === undefined) {
        return res.status(400).json({
          message: "Debes enviar al menos un campo para actualizar el carrito",
        });
      }

      fieldsToUpdate.updated_at = updated_at || new Date();

      await updateCartItem(id, fieldsToUpdate);

      // Relee el registro con includes para devolver la misma forma que en GET.
      const updatedCartItem = await getCartItemById(id);

      return res.status(200).json({
        message: "Elemento del carrito actualizado correctamente",
        data: updatedCartItem,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar el elemento del carrito",
        error: error.message,
      });
    }
  },

  async deleteCartItem(req, res) {
    try {
      // Lee el identificador unico del elemento del carrito a eliminar.
      const { id } = req.params;

      // Elimina el registro que coincide con la clave primaria del carrito.
      const deletedRows = await deleteCartItem(id);

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
