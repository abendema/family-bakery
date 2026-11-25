(function () {
  const root = document.getElementById("cart-content");
  if (!root) return;

  // Use the same currency format for each item and the order summary.
  const money = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);

  // Rebuild the cart display from the latest saved cart data.
  function render() {
    const cart = window.getCart();
    const products = cart
      .map((item) => ({
        ...BAKERY_PRODUCTS.find((p) => p.id === item.id),
        quantity: item.quantity,
      }))
      .filter((p) => p.id);
    if (!products.length) {
      root.innerHTML =
        '<div class="empty-cart"><i class="fa-solid fa-basket-shopping"></i><h2>Your bag is waiting for something lovely.</h2><p>It looks like you haven’t added any bakes yet.</p><a class="button button-primary" href="shop.html">Explore the shop <i class="fa-solid fa-arrow-right"></i></a></div>';
      return;
    }
    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const total = subtotal; // Delivery is left out until checkout is connected to the backend.

    root.innerHTML = `<section class="cart-items">${products.map((p) => `<article class="cart-item"><img src="${p.image}" alt="${p.name}"><div><span class="item-category">${p.category}</span><h3>${p.name}</h3><span class="item-price">${money(p.price)} each</span><div class="quantity-control"><button data-change="-1" data-id="${p.id}" aria-label="Decrease quantity">−</button><span>${p.quantity}</span><button data-change="1" data-id="${p.id}" aria-label="Increase quantity">+</button></div></div><div class="cart-item-end"><div class="line-total">${money(p.price * p.quantity)}</div><button class="remove-item" data-remove="${p.id}"><i class="fa-regular fa-trash-can"></i> Remove</button></div></article>`).join("")}</section><aside class="cart-summary"><h2>Order summary</h2><div class="summary-line"><span>Subtotal</span><span>${money(subtotal)}</span></div><div class="summary-line"><span>Delivery</span><span>Calculated later</span></div><div class="summary-line total"><span>Total</span><span>${money(total)}</span></div><button class="button button-primary" id="checkout-button">Proceed to checkout <i class="fa-solid fa-arrow-right"></i></button><p class="summary-note">No payment will be collected.</p><div id="checkout-message"></div></aside>`;
  }

  // Handle quantity changes, removals and the checkout message.
  root.addEventListener("click", (e) => {
    const change = e.target.closest("[data-change]");
    const remove = e.target.closest("[data-remove]");
    if (change) {
      const cart = window.getCart(),
        item = cart.find((x) => x.id === change.dataset.id);
      if (item) {
        item.quantity += Number(change.dataset.change);
        // A quantity of zero means the customer wants the item removed.
        if (item.quantity <= 0) {
          window.saveCart(cart.filter((x) => x.id !== item.id));
        } else window.saveCart(cart);
      }
      render();
    }
    if (remove) {
      window.saveCart(
        window.getCart().filter((x) => x.id !== remove.dataset.remove),
      );
      render();
      window.showToast("Item removed from your bag");
    }
    if (e.target.closest("#checkout-button")) {
      const message = document.getElementById("checkout-message");
      message.className = "checkout-message";
      message.textContent =
        "Checkout is ready for the next development phase. Connect your backend and payment provider here.. no order or payment has been submitted.";
    }
  });
  render();
})();
