import { CartModel, ProductModel } from "../../models/index.js";
import cartService from '../../services/cartService.js'

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

async function buildCartViewData(userDni) {
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
};

async function renderCartSidebar(req, res) {
  try {
    const { userDni } = req.params;
    const cartViewData = await buildCartViewData(userDni);

    return res.render("partials/cart-sidebar", {
      layout: false,
      ...cartViewData,
    });
  } catch (error) {
    return res.status(500).send("No se pudo cargar el sidebar del carrito");
  }
};

async function deleteCartItemAndRedirect(req, res) {
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

    return res.redirect("/");
  } catch (error) {
    return res.status(500).send("No se pudo eliminar la linea del carrito");
  }
};

async function createCartItem(req, res) {
  const users = await cartService.createCartItem(req.body);
  res.render("pages/index", { users, layout: "layouts/main" });
};

export const cartViewController = { buildCartViewData, renderCartSidebar, deleteCartItemAndRedirect, createCartItem };
export default cartViewController;
