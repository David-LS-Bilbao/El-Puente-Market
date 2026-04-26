document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector("[data-cart-sidebar-trigger]");
  const shell = document.querySelector("[data-cart-sidebar-shell]");
  const content = document.querySelector("[data-cart-sidebar-content]");

  if (!trigger || !shell || !content) return;
  // Carrito temporal de visitante en localStorage — activo mientras no hay usuario autenticado, se vacía al pasar por checkout
  const STORAGE_KEY = "elPuenteGuestCart";
  const getUserDni = () => trigger.dataset.cartSidebarUserDni?.trim() || "";
  const isGuestCart = () => !getUserDni();

  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  const normalizeImagePath = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  };

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const readGuestCart = () => {
    try {
      const cart = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(cart) ? cart : [];
    } catch {
      return [];
    }
  };

  const writeGuestCart = (cart) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  };

  const getGuestTotal = (cart) =>
    cart.reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 0), 0);

  const renderEmptyCart = () => `
    <div class="cart-sidebar">
      <div class="cart-sidebar__header">
        <div>
          <p class="cart-sidebar__eyebrow">Carrito</p>
          <h2>Tu carrito</h2>
        </div>
        <button type="button" class="cart-sidebar__close" data-cart-sidebar-close aria-label="Cerrar carrito">×</button>
      </div>
      <section class="cart-sidebar__empty">
        <h3>Tu carrito está vacío</h3>
        <p>Añade productos para verlos reflejados aquí.</p>
        <button type="button" class="cart-link-btn" data-cart-sidebar-close>Seguir comprando</button>
      </section>
    </div>
  `;

  const renderGuestCart = () => {
    const cart = readGuestCart();

    if (!cart.length) {
      content.innerHTML = renderEmptyCart();
      return;
    }

    const itemsHtml = cart
      .map((item) => {
        const productId = escapeHtml(item.productId);
        const name = escapeHtml(item.name || "Producto sin nombre");
        const image = normalizeImagePath(item.image);
        const quantity = Number(item.quantity || 1);
        const subtotal = Number(item.price || 0) * quantity;
        const media = image
          ? `<img src="${escapeHtml(image)}" alt="${name}" class="cart-sidebar__image">`
          : '<div class="cart-sidebar__placeholder" aria-hidden="true">Sin imagen</div>';

        return `
          <article class="cart-sidebar__item" data-item-id="${productId}" data-quantity="${quantity}" data-subtotal="${subtotal}">
            ${media}
            <div class="cart-sidebar__item-content">
              <h3>${name}</h3>
              <div class="cart-sidebar__qty-row">
                <button type="button" class="cart-qty-btn" data-action="minus" aria-label="Disminuir cantidad">−</button>
                <span class="cart-qty-value">${quantity}</span>
                <button type="button" class="cart-qty-btn" data-action="plus" aria-label="Aumentar cantidad">+</button>
                <button type="button" class="cart-delete-btn" data-action="delete" aria-label="Eliminar producto">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                    <path d="M10 11v6"></path>
                    <path d="M14 11v6"></path>
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                  </svg>
                </button>
              </div>
              <p class="cart-sidebar__subtotal">Subtotal: <strong>${currency.format(subtotal)}</strong></p>
            </div>
          </article>
        `;
      })
      .join("");

    content.innerHTML = `
      <div class="cart-sidebar">
        <div class="cart-sidebar__header">
          <div>
            <p class="cart-sidebar__eyebrow">Carrito</p>
            <h2>Tu carrito</h2>
          </div>
          <button type="button" class="cart-sidebar__close" data-cart-sidebar-close aria-label="Cerrar carrito">×</button>
        </div>
        <div class="cart-sidebar__list" aria-label="Productos del carrito">
          ${itemsHtml}
        </div>
        <div class="cart-sidebar__footer">
          <div class="cart-sidebar__total">
            <span>Total general</span>
            <strong data-cart-total>${currency.format(getGuestTotal(cart))}</strong>
          </div>
          <button type="button" class="cart-link-btn" data-cart-sidebar-close>Seguir comprando</button>
          <button type="button" class="cart-link-btn cart-link-btn--primary" data-action="checkout">Finalizar compra</button>
        </div>
      </div>
    `;
  };

  const addGuestItem = ({ productId, name, price, image }) => {
    if (!productId) return;

    const cart = readGuestCart();
    const existingItem = cart.find((item) => String(item.productId) === String(productId));

    if (existingItem) {
      existingItem.quantity = Number(existingItem.quantity || 0) + 1;
    } else {
      cart.push({
        productId,
        name,
        price: Number(price || 0),
        image: normalizeImagePath(image),
        quantity: 1,
      });
    }

    writeGuestCart(cart);
  };

  const addUserItem = async ({ productId }) => {
    const userDni = getUserDni();
    if (!userDni || !productId) return;

    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_dni: userDni,
        product_id: productId,
        quantity: 1,
      }),
    });
  };

  const updateGuestItem = (productId, nextQuantity) => {
    const cart = readGuestCart();
    const updatedCart = cart
      .map((item) =>
        String(item.productId) === String(productId)
          ? { ...item, quantity: nextQuantity }
          : item
      )
      .filter((item) => Number(item.quantity) > 0);

    writeGuestCart(updatedCart);
    renderGuestCart();
  };

  const loadContent = async ({ showLoading = false } = {}) => {
    const userDni = getUserDni();
    const panel = shell.querySelector(".cart-sidebar-shell__panel");
    const prevScroll = panel ? panel.scrollTop : 0;

    if (!userDni) {
      renderGuestCart();
      return;
    }

    if (showLoading) {
      content.innerHTML = '<p class="cart-sidebar__loading">Cargando carrito...</p>';
    }
    try {
      const response = await fetch(`/carrito/${userDni}/sidebar`, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      if (!response.ok) throw new Error();
      content.innerHTML = await response.text();
      if (panel) panel.scrollTop = prevScroll;
    } catch {
      content.innerHTML =
        '<section class="cart-sidebar__empty"><h3>No se pudo cargar el carrito</h3><p>Inténtalo de nuevo en unos instantes.</p><button type="button" class="cart-link-btn" data-cart-sidebar-close>Seguir comprando</button></section>';
    }
  };

  const updateItemDOM = (item, newQuantity, newTotalAmount) => {
    item.dataset.quantity = newQuantity;
    item.dataset.subtotal = newTotalAmount;
    const qtyEl = item.querySelector(".cart-qty-value");
    const subtotalEl = item.querySelector(".cart-sidebar__subtotal strong");
    if (qtyEl) qtyEl.textContent = newQuantity;
    if (subtotalEl) subtotalEl.textContent = currency.format(newTotalAmount);

    const allItems = [...content.querySelectorAll(".cart-sidebar__item")];
    const grandTotal = allItems.reduce(
      (sum, el) => sum + parseFloat(el.dataset.subtotal || 0),
      0
    );
    const totalEl = content.querySelector("[data-cart-total]");
    if (totalEl) totalEl.textContent = currency.format(grandTotal);
  };

  const openSidebar = () => {
    shell.classList.add("cart-sidebar-shell--open");
    shell.setAttribute("aria-hidden", "false");
    loadContent({ showLoading: true });
  };

  const closeSidebar = () => {
    shell.classList.remove("cart-sidebar-shell--open");
    shell.setAttribute("aria-hidden", "true");
  };

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    openSidebar();
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cart-add]");
    if (!btn) return;

    e.preventDefault();

    if (isGuestCart()) {
      addGuestItem({
        productId: btn.dataset.productId,
        name: btn.dataset.productName,
        price: btn.dataset.productPrice,
        image: btn.dataset.productImage,
      });
      openSidebar();
      return;
    }

    addUserItem({ productId: btn.dataset.productId }).finally(openSidebar);
  });

  shell.addEventListener("click", (e) => {
    if (e.target.closest("[data-cart-sidebar-close]")) closeSidebar();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  content.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    // Botón de checkout: está fuera de los ítems, se maneja aparte
    if (btn.dataset.action === "checkout") {
      const userDni = getUserDni();
      window.location.href = userDni ? "/checkout" : "/login";
      return;
    }

    const item = btn.closest("[data-item-id]");
    if (!item) return;

    const itemId = item.dataset.itemId;
    const action = btn.dataset.action;
    const quantity = parseInt(item.dataset.quantity, 10);
    btn.disabled = true;

    if (isGuestCart()) {
      if (action === "plus") {
        updateGuestItem(itemId, quantity + 1);
      }

      if (action === "minus") {
        updateGuestItem(itemId, quantity - 1);
      }

      if (action === "delete") {
        updateGuestItem(itemId, 0);
      }

      btn.disabled = false;
      return;
    }

    if (action === "plus") {
      // Actualización optimista: el usuario ve el cambio al instante
      const currentSubtotal = parseFloat(item.dataset.subtotal || 0);
      const unitPrice = quantity > 0 ? currentSubtotal / quantity : 0;
      updateItemDOM(item, quantity + 1, unitPrice * (quantity + 1));

      // Confirmación desde el servidor con el total recalculado real
      try {
        const res = await fetch(`/api/cart/${itemId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: quantity + 1 }),
        });
        if (res.ok) {
          const { data } = await res.json();
          updateItemDOM(item, data.quantity, parseFloat(data.total_amount));
        } else {
          await loadContent();
        }
      } catch {
        await loadContent();
      } finally {
        btn.disabled = false;
      }
      return;
    }

    if (action === "minus") {
      if (quantity > 1) {
        // Actualización optimista
        const currentSubtotal = parseFloat(item.dataset.subtotal || 0);
        const unitPrice = quantity > 0 ? currentSubtotal / quantity : 0;
        updateItemDOM(item, quantity - 1, unitPrice * (quantity - 1));

        try {
          const res = await fetch(`/api/cart/${itemId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: quantity - 1 }),
          });
          if (res.ok) {
            const { data } = await res.json();
            updateItemDOM(item, data.quantity, parseFloat(data.total_amount));
          } else {
            await loadContent();
          }
        } catch {
          await loadContent();
        } finally {
          btn.disabled = false;
        }
      } else {
        try {
          const res = await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
          await loadContent();
          if (!res.ok) return;
        } finally {
          btn.disabled = false;
        }
      }
      return;
    }

    if (action === "delete") {
      try {
        await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
        await loadContent();
      } finally {
        btn.disabled = false;
      }
    }
  });

  window.addEventListener("user-session-change", () => {
    if (shell.classList.contains("cart-sidebar-shell--open")) {
      loadContent({ showLoading: true });
    }
  });
});
