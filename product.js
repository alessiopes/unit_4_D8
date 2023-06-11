// Ottiene l'ID del prodotto dalla query string nell'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

////////////////////////////////////////////////////////////////

// Funzione per ottenere i dettagli del prodotto dal server
async function getProductDetails(productId) {
  try {
    const url = "https://striveschool-api.herokuapp.com/api/product/";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNDc0ZWI5YzBmNzAwMTQ0ODRlZWIiLCJpYXQiOjE2ODYwMDE1MjksImV4cCI6MTY4NzIxMTEyOX0.WrSJW5vw05hgljeuXKRsR-98YAITqOeqZunlVDEdJJM";

    const response = await fetch(`${url}${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore durante la richiesta API");
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Si è verificato un errore durante la chiamata API:", error);
    throw error;
  }
}

////////////////////////////////////////////////////////////////

// Funzione per mostrare gli elementi nella pagina con i dati del prodotto
function displayProductDetails(product) {
  const productImage = document.getElementById("productImage");
  const productName = document.getElementById("productName");
  const productBrand = document.getElementById("productBrand");
  const productDescription = document.getElementById("productDescription");
  const productPrice = document.getElementById("productPrice");

  // Imposta l'immagine del prodotto
  productImage.src = product.imageUrl;
  productImage.alt = product.name;

  // Imposta il nome del prodotto
  productName.textContent = product.name;

  // Imposta il brand del prodotto
  const brandText = document.createElement("span");
  brandText.classList.add("text-muted");
  brandText.textContent = product.brand;
  productBrand.appendChild(brandText);

  // Imposta la descrizione del prodotto
  productDescription.textContent = product.description;

  // Imposta il prezzo del prodotto
  const priceText = document.createElement("span");
  priceText.classList.add("text-dark", "fw-bold", "h4");
  priceText.textContent = `$${product.price}`;
  productPrice.appendChild(priceText);
}

////////////////////////////////////////////////////////////////

// Funzione di inizializzazione per ottenere i dettagli del prodotto e popolare gli elementi
async function init() {
  try {
    const product = await getProductDetails(productId);
    displayProductDetails(product);
  } catch (error) {
    console.error(
      "Si è verificato un errore durante l'inizializzazione:",
      error
    );
  }
}

////////////////////////////////////////////////////////////////

// Chiamata alla funzione di inizializzazione al caricamento della pagina
document.addEventListener("DOMContentLoaded", init);

////////////////////////////////////////////////////////////////

// Recupera il pulsante "Aggiungi al carrello"
const addToCartBtn = document.getElementById("addToCartBtn");

// Aggiungi un listener di evento al pulsante
addToCartBtn.addEventListener("click", () => {
  const product = {
    _id: productId, // Aggiungi l'ID del prodotto
    name: document.getElementById("productName").textContent,
    brand: document.getElementById("productBrand").textContent,
    description: document.getElementById("productDescription").textContent,
    price: parseFloat(
      document.getElementById("productPrice").textContent.replace("$", "")
    ),
  };

  addToCart(product);
});

////////////////////////////////////////////////////////////////

// Chiamata API GET per ottenere tutti i prodotti
const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNDc0ZWI5YzBmNzAwMTQ0ODRlZWIiLCJpYXQiOjE2ODYwMDE1MjksImV4cCI6MTY4NzIxMTEyOX0.WrSJW5vw05hgljeuXKRsR-98YAITqOeqZunlVDEdJJM";

fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Ottenere tutti i prodotti dalla risposta API
    const allProducts = data;

    // Selezionare casualmente 4 prodotti
    const randomProducts = getRandomProducts(allProducts, 4);

    // Selezionare l'elemento HTML per i prodotti correlati
    const relatedProductsContainer = document.getElementById(
      "relatedProductsContainer"
    );

    // Iterare sui prodotti casuali e creare gli elementi HTML
    createProductElements(randomProducts, relatedProductsContainer);
  })
  .catch((error) => {
    console.error("Errore durante il recupero dei prodotti:", error);
  });

////////////////////////////////////////////////////////////////

// Funzione per selezionare casualmente un numero specificato di prodotti da un array
function getRandomProducts(products, count) {
  const randomProducts = [];
  const productCount = products.length;

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * productCount);
    randomProducts.push(products[randomIndex]);
  }

  return randomProducts;
}

////////////////////////////////////////////////////////////////

function createProductElements(products) {
  const relatedProductsContainer = document.getElementById(
    "relatedProductsContainer"
  );

  products.forEach((product) => {
    // Creazione del wrapper del prodotto
    const productWrapper = document.createElement("div");
    productWrapper.classList.add("col-lg-3", "mb-4");

    // Creazione degli elementi HTML del prodotto
    const productElement = document.createElement("div");
    productElement.classList.add("card");
    productElement.style.cursor = "pointer";

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

    const productPrice = document.createElement("p");
    productPrice.classList.add("card-text", "product-price");
    productPrice.textContent = `$${product.price}`;

    // Aggiunge l'evento click per reindirizzare alla pagina prodotto
    productElement.addEventListener("click", () => {
      const productId = product._id;
      window.location.href = `product.html?id=${productId}`;
    });

    // Aggiunge il pulsante per aggiungere al carrello
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("btn", "btn-primary", "btn-sm");
    addToCartButton.textContent = "Aggiungi al carrello";
    addToCartButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Evita la propagazione dell'evento click alla card
      addToCart(product); // Chiamata alla funzione per aggiungere al carrello
    });

    // Inserisce gli elementi creati
    cardBody.appendChild(productName);
    cardBody.appendChild(productBrand);
    cardBody.appendChild(productPrice);
    cardBody.appendChild(addToCartButton); // Aggiunge il pulsante al cardBody

    productElement.appendChild(image);
    productElement.appendChild(cardBody);

    productWrapper.appendChild(productElement);

    relatedProductsContainer.appendChild(productWrapper);
  });
}

////////////////////////////////////////////////////////////////

// Aggiungi il listener al pulsante "Aggiungi al Carrello"
const addToCartButton = document.querySelector("#addToCartBtn");
addToCartButton.addEventListener("click", () => {
  // Mostra la modale "Prodotto aggiunto al carrello"
  const addToCartModal = new bootstrap.Modal(
    document.getElementById("addToCartModal"),
    {}
  );
  addToCartModal.show();
});

////////////////////////////////////////////////////////////////

// Aggiungi il listener per la chiusura della modale
const closeModalButton = document.querySelector("#addToCartModal .btn-close");
closeModalButton.addEventListener("click", () => {
  const addToCartModal = bootstrap.Modal.getInstance(
    document.getElementById("addToCartModal")
  );
  addToCartModal.hide();
});

////////////////////////////////////////////////////////////////

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
