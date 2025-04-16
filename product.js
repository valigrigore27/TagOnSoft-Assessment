//import { getFavorites, isFavorite, toggleFavorite } from "./script.js";
const container = document.getElementById("productDetail");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

function showProductsDetails() {
  if (!productId) {
    container.innerHTML = "<p>Invalid product</p>";
  } else {
    const id = Number(productId);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((product) => {
        container.innerHTML = `
        <div class="product-header">
        <button class="back-button">⬅️</button>
        <div class="heart-icon" data-id="${product.id}">${
          isFavorite(id) ? "❤️" : "🤍"
        }</div>
        </div>
        <img src="${product.image}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Rating:</strong> ${product.rating.rate} (${
          product.rating.count
        } review-uri)</p>
        <button class="add-to-cart-btn">ADD TO CART</button>
      `;

        const heartIcon = container.querySelector(".heart-icon");
        heartIcon.addEventListener("click", (e) => {
          toggleFavorite(id, e.target);
        });

        const backButton = container.querySelector(".back-button");
        backButton.addEventListener("click", () => {
          window.history.back();
        });
      })
      .catch((err) => {
        container.innerHTML = "<p>Eroare la încărcarea produsului.</p>";
        console.error(err);
      });
  }
}
showProductsDetails();

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

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
