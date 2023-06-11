// Funzione per gestire la chiamata API GET
function getProductList() {
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNDc0ZWI5YzBmNzAwMTQ0ODRlZWIiLCJpYXQiOjE2ODYwMDE1MjksImV4cCI6MTY4NzIxMTEyOX0.WrSJW5vw05hgljeuXKRsR-98YAITqOeqZunlVDEdJJM";

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
}

async function displayProducts() {
  const productListContainer = document.getElementById("productList");

  try {
    const products = await getProductList();

    productListContainer.innerHTML = ""; // Resetta il contenuto del container

    products.forEach((product) => {
      // Creazione degli elementi HTML
      const cardWrapper = document.createElement("div");
      cardWrapper.classList.add("mb-3", "col-lg-3", "col-md-4", "col-6");

      const productCard = document.createElement("div");
      productCard.classList.add("card");
      productCard.style.cursor = "pointer";

      const image = document.createElement("img");
      image.classList.add("card-img-top", "product-image-small", "p-3");
      image.src = product.imageUrl;
      image.alt = product.name;

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const productName = document.createElement("h5");
      productName.classList.add("card-title", "text-truncate", "title-2-line");
      productName.textContent = product.name;

      const productBrand = document.createElement("p");
      productBrand.classList.add("card-text", "product-brand");
      productBrand.textContent = product.brand;

      const productDescription = document.createElement("p");
      productDescription.classList.add(
        "card-text",
        "product-description",
        "text-truncate",
        "description-3-line"
      );
      productDescription.textContent = product.description;

      const productPrice = document.createElement("p");
      productPrice.classList.add("card-text", "product-price");
      productPrice.textContent = `$${product.price}`;

      // Aggiunge l'evento click per reindirizzare alla pagina prodotto
      productCard.addEventListener("click", () => {
        const productId = product._id;
        window.location.href = `product.html?id=${productId}`;
      });

      // Aggiunge il pulsante per aggiungere al carrello
      const addToCartButton = document.createElement("button");
      addToCartButton.classList.add("btn", "btn-primary", "btn-sm", "addToCartBtn");
      addToCartButton.textContent = "Aggiungi al carrello";
      addToCartButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Evita la propagazione dell'evento click alla card
        addToCart(product); // Chiamata alla funzione per aggiungere al carrello
        openAddToCartModal(); //Chiamata alla funzione per aprire la modale
      });

      // Inserisce gli elementi creati
      cardBody.appendChild(productName);
      cardBody.appendChild(productBrand);
      cardBody.appendChild(productDescription);
      cardBody.appendChild(productPrice);
      cardBody.appendChild(addToCartButton); // Aggiunge il pulsante al cardBody

      productCard.appendChild(image);
      productCard.appendChild(cardBody);

      cardWrapper.appendChild(productCard);

      productListContainer.appendChild(cardWrapper);
    });
  } catch (error) {
    console.error(
      "Si è verificato un errore durante la chiamata API GET:",
      error
    );
  }
}

displayProducts();


////////////////////////////////////////////////////////////////

function openAddToCartModal() {
  // Mostra la modale "Prodotto aggiunto al carrello"
  const addToCartModal = new bootstrap.Modal(
    document.getElementById("addToCartModal"),
    {}
  );
  addToCartModal.show();
}

////////////////////////////////////////////////////////////////

// Aggiunge il listener per la chiusura della modale
const closeModalButton = document.querySelector("#addToCartModal .btn-close");
closeModalButton.addEventListener("click", () => {
  const addToCartModal = bootstrap.Modal.getInstance(
    document.getElementById("addToCartModal")
  );
  addToCartModal.hide();
});

// Aggiunge il listener per la chiusura della modale al click fuori dalla modale stessa
const modalBackdrop = document.querySelector("#addToCartModal");
modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) {
    const addToCartModal = bootstrap.Modal.getInstance(
      document.getElementById("addToCartModal")
    );
    addToCartModal.hide();
  }
});

