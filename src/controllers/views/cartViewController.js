import { CartModel, ProductModel } from "../../models/index.js";
import cartService from "../../services/cartService.js";
import productServices from "../../services/productServices.js";

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
}

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
}

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
}

async function createCartItem(req, res) {
  // No tengo el user_dni
  // Con el user_dni puedo recuperar el carrito completo y miro si tengo ya algún producto con product_id para que si existe le añado una a la cantidad y si no existe lo creo en la tabla carrito.
  // Debo redireccionar a la página principal

  try {
    console.log(req.body);
    const { productId, quantity = 1 } = req.body ?? {};

    if (!productId) {
      return res
        .status(400)
        .send("Falta el ID del producto para añadir al carrito");
    }

    const productIdNumber = Number(productId);
    if (Number.isNaN(productIdNumber) || productIdNumber <= 0) {
      return res.status(400).send("ID de producto inválido");
    }

    const userDni = req.params.dni;
    const effectiveQuantity = Number(quantity) || 1;

    const product = await productServices.getProductById(productIdNumber);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    const unitPrice =
      product.on_discount && product.price_discount != null
        ? Number(product.price_discount)
        : Number(product.price);

    const existingCartItem = await cartService.getCartItemByUserAndProduct(
      userDni,
      productIdNumber,
    );

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + effectiveQuantity;
      const newTotalAmount = (unitPrice * newQuantity).toFixed(2);

      await cartService.updateCartItem(existingCartItem.id, {
        quantity: newQuantity,
        total_amount: newTotalAmount,
        updated_at: new Date(),
      });
    } else {
      const totalAmount = (unitPrice * effectiveQuantity).toFixed(2);
      await cartService.createCartItem({
        user_dni: userDni,
        product_id: productIdNumber,
        quantity: effectiveQuantity,
        total_amount: totalAmount,
        created_at: new Date(),
      });
    }

    return res.redirect("/");
  } catch (error) {
    console.error("Error creando item de carrito:", error);
    return res.status(500).send("No se pudo añadir el producto al carrito");
  }
}

export const cartViewController = {
  buildCartViewData,
  renderCartSidebar,
  deleteCartItemAndRedirect,
  createCartItem,
};
export default cartViewController;
