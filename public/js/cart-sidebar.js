document.addEventListener("DOMContentLoaded", () => {
  // Localiza los nodos mínimos para activar el carrito lateral desde cualquier vista.
  const trigger = document.querySelector("[data-cart-sidebar-trigger]");
  const shell = document.querySelector("[data-cart-sidebar-shell]");
  const content = document.querySelector("[data-cart-sidebar-content]");

  if (!trigger || !shell || !content) return;

  const openSidebar = async () => {
    const userDni = trigger.dataset.cartSidebarUserDni;
    const sidebarUrl = `/carrito/${userDni}/sidebar`;

    // Abre el panel enseguida y muestra estado de carga mientras llega el partial real.
    content.innerHTML = '<p class="cart-sidebar__loading">Cargando carrito...</p>';
    shell.classList.add("cart-sidebar-shell--open");
    shell.setAttribute("aria-hidden", "false");

    try {
      // El contenido del sidebar se renderiza en servidor con datos reales del carrito.
      const response = await fetch(sidebarUrl, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      if (!response.ok) {
        content.innerHTML =
          '<section class="cart-sidebar__empty"><h3>No se pudo cargar el carrito</h3><p>Inténtalo de nuevo en unos instantes.</p><button type="button" class="cart-link-btn" data-cart-sidebar-close>Seguir comprando</button></section>';
        return;
      }

      content.innerHTML = await response.text();
    } catch (_error) {
      content.innerHTML =
        '<section class="cart-sidebar__empty"><h3>No se pudo cargar el carrito</h3><p>Inténtalo de nuevo en unos instantes.</p><button type="button" class="cart-link-btn" data-cart-sidebar-close>Seguir comprando</button></section>';
    }
  };

  // Cierra el panel sin tocar el contenido para reutilizarlo hasta la próxima apertura.
  const closeSidebar = () => {
    shell.classList.remove("cart-sidebar-shell--open");
    shell.setAttribute("aria-hidden", "true");
  };

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openSidebar();
  });

  shell.addEventListener("click", (event) => {
    // Permite cerrar tanto desde el backdrop como desde cualquier CTA marcado para cerrar.
    if (event.target.closest("[data-cart-sidebar-close]")) {
      closeSidebar();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });
});
