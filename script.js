const apiUrl = "https://fakestoreapi.com/products";
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const productCount = document.getElementById("productCount");
const favoritesButton = document.getElementById("favoritesButton");

let allProducts = [];

//iau datele din api
function fetchProducts() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      displayProducts(data);
    })
    .catch((err) => {
      productGrid.innerHTML = "<p>Error fetching products..</p>";
      console.error(err);
    });
}
fetchProducts();

//din toate produsele pastrez doar cele care contin string-ul cautat de mine
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = allProducts.filter((product) =>
    product.title.toLowerCase().includes(value)
  );
  displayProducts(filtered);
});

//cand apas pe un produs sa ma duca pe pagina cu detalii a produsului
function redirectToProductDetailsPage(card, product) {
  card.addEventListener("click", (e) => {
    window.location.href = `product.html?id=${product.id}`;
  });
}
//la fel
favoritesButton.addEventListener("click", () => {
  window.location.href = "favorites.html";
});

//creez un inner html ca sa afisez detaliile produselor
function displayProducts(products) {
  productGrid.innerHTML = "";
  productCount.textContent = `${products.length} products found`;

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-title">${product.title}</div>
      <div class="product-price">$${product.price}</div>
      <div class="heart-icon" data-id="${product.id}">🤍</div>
    `;

    redirectToProductDetailsPage(card, product);

    card.querySelector(".heart-icon").addEventListener("click", (e) => {
      toggleFavorite(product.id, e.target);
    });

    if (isFavorite(product.id)) {
      card.querySelector(".heart-icon").textContent = "❤️";
    }

    productGrid.appendChild(card);
  });
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

//cand inima e alba si o apas intra in favorite(localStorage) si se face rosie si invers
function toggleFavorite(id, icon) {
  let favorites = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
    icon.textContent = "🤍";
  } else {
    favorites.push(id);
    icon.textContent = "❤️";
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
