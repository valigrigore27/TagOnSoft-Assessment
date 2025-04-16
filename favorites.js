const productGrid = document.getElementById("productGrid");
const backButton = document.getElementById("backButton");
const apiUrl = "https://fakestoreapi.com/products";

let allProducts = [];

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

//afisez doar produsele care au id-ul in favorites(local)
function fetchProducts() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      const favorites = allProducts.filter((product) => isFavorite(product.id));
      displayFavorites(favorites);
    })
    .catch((err) => {
      productGrid.innerHTML = "<p>Error loading favorites.</p>";
      console.error(err);
    });
}

//pot si de aici sa intru pe pagina de detalii a produsului
function redirectToProductDetailsPage(card, product) {
  card.addEventListener("click", () => {
    window.location.href = `product.html?id=${product.id}`;
  });
}

function displayFavorites(products) {
  productGrid.innerHTML = "";

  if (products.length === 0) {
    productGrid.innerHTML = "<p>No favorite products yet.</p>";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-title">${product.title}</div>
      <div class="product-price">$${product.price}</div>
    `;

    redirectToProductDetailsPage(card, product);
    productGrid.appendChild(card);
  });
}

backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

fetchProducts();
