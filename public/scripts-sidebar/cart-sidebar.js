document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector("[data-cart-sidebar-trigger]");
  const shell = document.querySelector("[data-cart-sidebar-shell]");
  const content = document.querySelector("[data-cart-sidebar-content]");

  if (!trigger || !shell || !content) return;
  const getUserDni = () => trigger.dataset.cartSidebarUserDni?.trim() || "";

  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  const loadContent = async ({ showLoading = false } = {}) => {
    const userDni = getUserDni();
    const panel = shell.querySelector(".cart-sidebar-shell__panel");
    const prevScroll = panel ? panel.scrollTop : 0;

    if (!userDni) {
      content.innerHTML =
        '<section class="cart-sidebar__empty"><h3>Selecciona un usuario</h3><p>Elige un usuario en la cabecera para ver su carrito.</p><button type="button" class="cart-link-btn" data-cart-sidebar-close>Cerrar</button></section>';
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
