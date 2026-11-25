(function () {
  const root = document.getElementById("product-detail");
  if (!root) return;

  const id = new URLSearchParams(location.search).get("id");
  const p = BAKERY_PRODUCTS.find((item) => item.id === id);

  // Format the product price as currency.
  const money = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);

  // Show a friendly message if the requested product doesn't exist.
  if (!p) {
    root.innerHTML =
      '<div class="not-found"><h2>We could not find that bake.</h2><p>It may have gone out of the oven already.</p><a href="shop.html">Return to the shop</a></div>';
    return;
  }

  document.title = `${p.name} | Family Bakery`;
  root.innerHTML = `<div class="detail-image"><img src="${p.image}" alt="${p.name}"></div><div class="detail-copy"><span class="eyebrow">${p.category} / ${p.tag}</span><h1>${p.name}</h1><div class="detail-rating"><i class="fa-solid fa-star"></i> ${(4.6 + p.popularity / 250).toFixed(1)} · Customer favourite</div><div class="detail-price">${money(p.price)}</div><p>${p.description}</p><p>Prepared in small batches at Family Bakery. Product availability may vary throughout the day.</p><div class="detail-actions"><input class="quantity-input" type="number" min="1" max="20" value="1" aria-label="Quantity"><button class="button button-primary" id="detail-add">Add to bag <i class="fa-solid fa-bag-shopping"></i></button></div><div class="detail-note"><i class="fa-solid fa-heart"></i> Baked with care · Packed fresh · Made for sharing</div></div>`;

  // Add the chosen quantity, keeping it within the input's allowed range.
  document.getElementById("detail-add").addEventListener("click", () => {
    const qty = Math.max(
      1,
      Math.min(20, Number(root.querySelector("input").value) || 1),
    );
    window.addToCart(p.id, qty);
  });
})();
