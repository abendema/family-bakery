(function () {
  const grid = document.getElementById("product-grid"),
    search = document.getElementById("product-search"),
    sort = document.getElementById("product-sort"),
    count = document.getElementById("results-count");
  if (!grid) return;

  let category = new URLSearchParams(location.search).get("category") || "all";

  // Keep prices consistent across the shop and product pages.
  const money = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  // Apply the selected category, search term and sort order before showing products.
  function render() {
    let items = [...BAKERY_PRODUCTS];
    if (category !== "all")
      items = items.filter((p) => p.category === category);
    const term = search.value.trim().toLowerCase();
    if (term)
      items = items.filter((p) =>
        (p.name + " " + p.description + " " + p.category)
          .toLowerCase()
          .includes(term),
      );
    switch (sort.value) {
      case "price-low":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        items.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        items.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        items.sort((a, b) => b.popularity - a.popularity);
    }
    count.textContent = `Showing ${items.length} ${items.length === 1 ? "bake" : "bakes"}`;
    grid.innerHTML = items.length
      ? items
          .map(
            (p) =>
              `<article class="product-card"><a class="product-image" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span></a><div class="product-info"><div class="product-meta"><span>${p.category}</span><span class="stars"><i class="fa-solid fa-star"></i> ${(4.6 + p.popularity / 250).toFixed(1)}</span></div><h3><a href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a></h3><p>${p.description}</p><div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="add-button" data-add="${p.id}"><i class="fa-solid fa-plus"></i> ADD TO BAG</button></div></div></article>`,
          )
          .join("")
      : '<div class="empty-results"><i class="fa-solid fa-bread-slice"></i><h3>No bakes found</h3><p>Try another search or choose a different category.</p></div>';
  }

  // Switch categories and refresh the visible product list.
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === category);
    btn.addEventListener("click", () => {
      category = btn.dataset.category;
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.toggle("active", b === btn));
      render();
    });
  });

  search.addEventListener("input", render);
  sort.addEventListener("change", render);

  // Use one click listener for all add-to-bag buttons, including refreshed cards.
  grid.addEventListener("click", (e) => {
    const button = e.target.closest("[data-add]");
    if (button) window.addToCart(button.dataset.add);
  });
  
  render();
})();
