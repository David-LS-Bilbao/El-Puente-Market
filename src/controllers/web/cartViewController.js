import { CartModel, ProductModel } from "../../models/index.js";

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

// Adapta la ruta de imagen para que la vista pueda pintar tanto URLs completas
// como rutas relativas del proyecto sin lógica extra en el EJS.
function normalizeImagePath(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
}

const cartViewController = {
  async renderCartView(req, res) {
    try {
      const { userDni } = req.params;

      // Carga solo los items del usuario solicitado y trae el producto asociado
      // para poder renderizar nombre e imagen directamente en la vista.
      const cartItems = await CartModel.findAll({
        where: { user_dni: userDni },
        include: [ProductModel],
      });

      // Prepara una estructura de datos simple para el EJS y deja listos los
      // importes formateados en servidor.
      const items = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        subtotal: Number(item.total_amount || 0),
        subtotalFormatted: currencyFormatter.format(Number(item.total_amount || 0)),
        productName: item.Product?.name || "Producto sin nombre",
        productImage: normalizeImagePath(item.Product?.image),
      }));

      // Calcula el total del carrito en servidor para mantener la vista simple
      // y sin dependencia de JavaScript en esta iteracion.
      const totalGeneral = items.reduce((total, item) => total + item.subtotal, 0);

      return res.render("pages/cart", {
        layout: "layouts/main",
        pageTitle: `Carrito | ${userDni}`,
        pageStyle: "/css/cart.css",
        userDni,
        items,
        isEmpty: items.length === 0,
        totalGeneralFormatted: currencyFormatter.format(totalGeneral),
      });
    } catch (error) {
      return res.status(500).render("pages/error", {
        layout: "layouts/main",
        pageTitle: "Error | El Puente",
        message: "No se pudo cargar la vista del carrito",
        error,
      });
    }
  },

  async deleteCartItemAndRedirect(req, res) {
    try {
      const { userDni, id } = req.params;

      // Limita el borrado al carrito del usuario indicado en la URL para no
      // eliminar una linea ajena por error.
      const cartItem = await CartModel.findOne({
        where: {
          id,
          user_dni: userDni,
        },
      });

      if (!cartItem) {
        return res.status(404).send("No se encontró la linea del carrito");
      }

      await cartItem.destroy();

      return res.redirect(`/carrito/${userDni}`);
    } catch (error) {
      return res.status(500).send("No se pudo eliminar la linea del carrito");
    }
  },
};

export default cartViewController;
