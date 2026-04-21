document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector("[data-cart-sidebar-trigger]");
  const shell = document.querySelector("[data-cart-sidebar-shell]");
  const content = document.querySelector("[data-cart-sidebar-content]");

  if (!trigger || !shell || !content) return;

  const userDni = trigger.dataset.cartSidebarUserDni;

  const loadContent = async ({ showLoading = false } = {}) => {
    if (showLoading) {
      content.innerHTML = '<p class="cart-sidebar__loading">Cargando carrito...</p>';
    }
    try {
      const response = await fetch(`/carrito/${userDni}/sidebar`, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      if (!response.ok) throw new Error();
      content.innerHTML = await response.text();
    } catch {
      content.innerHTML =
        '<section class="cart-sidebar__empty"><h3>No se pudo cargar el carrito</h3><p>Inténtalo de nuevo en unos instantes.</p><button type="button" class="cart-link-btn" data-cart-sidebar-close>Seguir comprando</button></section>';
    }
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

  // Delegación de eventos para +, - y papelera sobre contenido dinámico.
  content.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const item = btn.closest("[data-item-id]");
    if (!item) return;

    const itemId = item.dataset.itemId;
    const action = btn.dataset.action;
    const quantity = parseInt(item.dataset.quantity, 10);

    if (action === "plus") {
      await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: quantity + 1 }),
      });
      await loadContent();
      return;
    }

    if (action === "minus") {
      if (quantity > 1) {
        await fetch(`/api/cart/${itemId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: quantity - 1 }),
        });
      } else {
        await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
      }
      await loadContent();
      return;
    }

    if (action === "delete") {
      await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
      await loadContent();
    }
  });
});
