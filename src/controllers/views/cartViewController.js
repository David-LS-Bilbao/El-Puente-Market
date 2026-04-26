import { CartModel, ProductModel } from "../../models/index.js";
import cartService from '../../services/cartService.js'

// const currencyFormatter = new Intl.NumberFormat("es-ES", {
//   style: "currency",
//   currency: "EUR",
// });

// // Adapta la ruta de imagen para que la vista pueda pintar tanto URLs completas
// // como rutas relativas del proyecto sin lógica extra en el EJS.
// function normalizeImagePath(imagePath) {
//   if (!imagePath) return null;
//   if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
//     return imagePath;
//   }
//   return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
// }

// async function buildCartViewData(userDni) {
//   const cartItems = await CartModel.findAll({
//     where: { user_dni: userDni },
//     include: [ProductModel],
//     order: [["id", "ASC"]],
//   });

//   const items = cartItems.map((item) => ({
//     id: item.id,
//     quantity: item.quantity,
//     subtotal: Number(item.total_amount || 0),
//     subtotalFormatted: currencyFormatter.format(Number(item.total_amount || 0)),
//     productName: item.Product?.name || "Producto sin nombre",
//     productImage: normalizeImagePath(item.Product?.image),
//   }));

//   const totalGeneral = items.reduce((total, item) => total + item.subtotal, 0);

//   return {
//     userDni,
//     items,
//     isEmpty: items.length === 0,
//     totalGeneralFormatted: currencyFormatter.format(totalGeneral),
//   };
// }

// const cartViewController = {
//   async renderCartSidebar(req, res) {
//     try {
//       const { userDni } = req.params;
//       const cartViewData = await buildCartViewData(userDni);

//       return res.render("partials/cart-sidebar", {
//         layout: false,
//         ...cartViewData,
//       });
//     } catch (error) {
//       return res.status(500).send("No se pudo cargar el sidebar del carrito");
//     }
//   },

//   async deleteCartItemAndRedirect(req, res) {
//     try {
//       const { userDni, id } = req.params;

//       // Limita el borrado al carrito del usuario indicado en la URL para no
//       // eliminar una linea ajena por error.
//       const cartItem = await CartModel.findOne({
//         where: {
//           id,
//           user_dni: userDni,
//         },
//       });

//       if (!cartItem) {
//         return res.status(404).send("No se encontró la linea del carrito");
//       }

//       await cartItem.destroy();

//       return res.redirect("/");
//     } catch (error) {
//       return res.status(500).send("No se pudo eliminar la linea del carrito");
//     }
//   },
// };


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

    // 1. Usamos tu función de servicio para obtener el registro base
    const cartItem = await cartService.getCartItemRecordById(id);

    if (!cartItem) {
      return res.status(404).send("Ítem del carrito no encontrado");
    }

    // 2. Obtenemos el producto para recalcular el precio (Seguridad)
    const product = await ProductModel.findByPk(cartItem.product_id);

    const unitPrice = product.on_discount && product.price_discount != null
      ? Number(product.price_discount)
      : Number(product.price);

    // 3. Preparamos los campos para el "patch parcial" que hace tu servicio
    const fieldsToUpdate = {
      quantity: Number(quantity),
      total_amount: (unitPrice * Number(quantity)).toFixed(2),
      updated_at: new Date()
    };

    // 4. Llamamos a tu función updateCartItem del servicio
    // Esta función internamente ya hace el cartItem.update(fieldsToUpdate)
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
  getViewEditCart
};



export default cartViewController;
