document.addEventListener("DOMContentLoaded", async () => {
  const STORAGE_KEY = "elPuenteCurrentUserDni";
  const select = document.querySelector("[data-user-session-select]");
  const cartTrigger = document.querySelector("[data-cart-sidebar-trigger]");

  if (!select || !cartTrigger) return;

  const updateActiveUser = (userDni) => {
    const normalizedUserDni = userDni?.trim() || "";

    if (normalizedUserDni) {
      window.localStorage.setItem(STORAGE_KEY, normalizedUserDni);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    cartTrigger.dataset.cartSidebarUserDni = normalizedUserDni;
    cartTrigger.title = normalizedUserDni
      ? `Abrir carrito de ${normalizedUserDni}`
      : "Selecciona un usuario para abrir el carrito";

    window.dispatchEvent(
      new CustomEvent("user-session-change", {
        detail: { userDni: normalizedUserDni },
      })
    );
  };

  try {
    const response = await fetch("/api/user", {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });

    if (!response.ok) {
      throw new Error("No se pudo cargar la lista de usuarios");
    }

    const users = await response.json();

    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.dni;
      option.textContent = `${user.name} ${user.surname} (${user.dni})`;
      select.append(option);
    });

    const savedUserDni = window.localStorage.getItem(STORAGE_KEY);
    const fallbackUserDni = users.some((user) => user.dni === "12345678A")
      ? "12345678A"
      : "";
    const initialUserDni = users.some((user) => user.dni === savedUserDni)
      ? savedUserDni
      : fallbackUserDni;

    select.value = initialUserDni;
    updateActiveUser(initialUserDni);
  } catch (_error) {
    select.disabled = true;
    select.innerHTML = '<option value="">Usuarios no disponibles</option>';
    updateActiveUser("");
  }

  select.addEventListener("change", () => {
    updateActiveUser(select.value);
  });
});
