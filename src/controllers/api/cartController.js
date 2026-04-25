import {
  createCartItem,
  deleteCartItem,
  getAllCartItems,
  getCartItemById,
  getCartItemRecordById,
  getCartItemsByUser,
  updateCartItem,
} from "../../services/cartService.js";
import { CartModel, ProductModel, UserModel } from "../../models/index.js";

async function getExistingUser(userDni) {
  return UserModel.findByPk(userDni);
}

async function getExistingProduct(productId) {
  return ProductModel.findByPk(productId);
}

function getUnitPrice(product) {
  return product.on_discount && product.price_discount != null
    ? Number(product.price_discount)
    : Number(product.price);
}

const cartController = {
  async getAllCartItems(req, res) {
    try {
      const cartItems = await getAllCartItems();

      return res.status(200).json(cartItems);
    } catch (error) {
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
      const { userDni } = req.params;

      const cartItems = await getCartItemsByUser(userDni);

      return res.status(200).json(cartItems);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener el carrito del usuario",
        error: error.message,
      });
    }
  },

  async createCartItem(req, res) {
    try {
      const requestBody = req.body ?? {};
      const {
        user_dni,
        product_id,
        quantity = 1,
        updated_at,
        created_at,
      } = requestBody;
      const qty = Number(quantity);

      if (!user_dni || product_id == null) {
        return res.status(400).json({
          message: "Faltan datos obligatorios para crear el elemento del carrito",
        });
      }

      if (!Number.isInteger(qty) || qty < 1) {
        return res.status(400).json({
          message: "quantity debe ser un entero positivo",
        });
      }

      const [user, product] = await Promise.all([
        getExistingUser(user_dni),
        getExistingProduct(product_id),
      ]);

      if (!user) {
        return res.status(400).json({
          message: "Usuario no encontrado",
        });
      }

      if (!product) {
        return res.status(400).json({
          message: "Producto no encontrado",
        });
      }

      const totalAmount = getUnitPrice(product) * qty;

      const newCartItem = await createCartItem({
        user_dni,
        product_id,
        quantity: qty,
        updated_at: updated_at || new Date(),
        total_amount: totalAmount.toFixed(2),
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
      const requestBody = req.body ?? {};
      const { user_dni, product_id, quantity } = requestBody;
      const parsedQuantity =
        quantity !== undefined ? Number(quantity) : undefined;
      if (quantity !== undefined) {
        if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
          return res.status(400).json({
            message: "quantity debe ser un entero positivo",
          });
        }
      }

      const cartItem = await getCartItemRecordById(id);

      if (!cartItem) {
        return res.status(404).json({
          message: "No se encontró el elemento del carrito para actualizar",
        });
      }

      const fieldsToUpdate = {};

      if (user_dni !== undefined) fieldsToUpdate.user_dni = user_dni;
      if (product_id !== undefined) fieldsToUpdate.product_id = product_id;
      if (parsedQuantity !== undefined) fieldsToUpdate.quantity = parsedQuantity;

      if (!Object.keys(fieldsToUpdate).length) {
        return res.status(400).json({
          message: "Debes enviar al menos un campo para actualizar el carrito",
        });
      }

      if (user_dni !== undefined) {
        const user = await getExistingUser(user_dni);
        if (!user) {
          return res.status(400).json({ message: "Usuario no encontrado" });
        }
      }

      const effectiveProductId = fieldsToUpdate.product_id ?? cartItem.product_id;
      const effectiveQuantity = fieldsToUpdate.quantity ?? cartItem.quantity;
      const product = await getExistingProduct(effectiveProductId);
      if (!product) {
        return res.status(400).json({ message: "Producto no encontrado" });
      }
      const unitPrice = getUnitPrice(product);
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
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar el elemento del carrito",
        error: error.message,
      });
    }
  },

  async deleteCartItem(req, res) {
    try {
      const { id } = req.params;

      const deletedRows = await deleteCartItem(id);

      if (!deletedRows) {
        return res.status(404).json({
          message: "No se encontró el elemento del carrito para eliminar",
        });
      }

      return res.status(200).json({
        message: "Elemento del carrito eliminado correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al eliminar el elemento del carrito",
        error: error.message,
      });
    }
  },
};

export default cartController;
