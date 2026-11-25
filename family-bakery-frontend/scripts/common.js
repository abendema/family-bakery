(function () {
  const CART_KEY = "familyBakeryCart";

  // Read the saved cart safely, even if localStorage contains invalid data.
  window.getCart = () => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  };

  // Save cart changes and keep the header count in sync.
  window.saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.updateCartCount();
  };

  // Show the total number of items beside every cart icon.
  window.updateCartCount = () => {
    const count = window
      .getCart()
      .reduce((sum, item) => sum + item.quantity, 0);
    document
      .querySelectorAll(".cart-count")
      .forEach((el) => (el.textContent = count));
  };

  // Add a product to the cart, or increase its quantity if it's already there.
  window.addToCart = (id, quantity = 1) => {
    const cart = window.getCart();
    const found = cart.find((item) => item.id === id);
    if (found) found.quantity += quantity;
    else cart.push({ id, quantity });
    window.saveCart(cart);
    window.showToast("Added to your bag");
  };

  // Give a confirmation after a cart action.
  window.showToast = (message) => {
    const toast = document.querySelector(".toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  };

  // Handle the small screen navigation menu once the page is ready.
  document.addEventListener("DOMContentLoaded", () => {
    window.updateCartCount();
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    if (toggle && nav)
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.innerHTML = open
          ? '<i class="fa-solid fa-xmark"></i>'
          : '<i class="fa-solid fa-bars"></i>';
      });
  });
})();
