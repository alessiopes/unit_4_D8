//? Definisci funzioni e variabili per gestire il carrello

//* Aggiunge prodotto al carrello
function addToCart(product) {
  // Verifica se il carrello è già presente nel local storage
  let cart = localStorage.getItem("cart");

  // Se il carrello non esiste, crea un array vuoto
  if (!cart) {
    cart = [];
  } else {
    // Se il carrello esiste, converte la stringa JSON in array
    cart = JSON.parse(cart);
  }

  // Verifica se il prodotto è già presente nel carrello
  const existingProduct = cart.find((item) => item._id === product._id);

  if (existingProduct) {
    // Se il prodotto è già presente, incrementa la quantità
    existingProduct.quantity += 1;
  } else {
    // Se il prodotto non è presente, aggiungi il prodotto al carrello con quantità 1
    product.quantity = 1;
    cart.push(product);
  }

  // Salva il carrello aggiornato nel local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Mostra il carrello aggiornato nella console
  console.log("Carrello aggiornato:", cart);
}

/////////////////////////////////////////////////////////

//* Rimuove prodotto dal carrello
function removeFromCart(productId) {
  // Verifica se il carrello è presente nel local storage
  let cart = localStorage.getItem("cart");

  // Se il carrello esiste, converte la stringa JSON in array
  if (cart) {
    cart = JSON.parse(cart);

    // Cerca il prodotto da rimuovere nel carrello
    const updatedCart = cart.filter((product) => product._id !== productId);

    // Verifica se è avvenuta una modifica nel carrello
    if (updatedCart.length !== cart.length) {
      // Salva il carrello aggiornato nel local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Mostra il carrello aggiornato nella console
      console.log("Carrello aggiornato:", cart);

      // Aggiunge un alert alla rimozione dal carrello
      alert("Prodotto rimosso dal carrello!");
    }
  }
}

/////////////////////////////////////////////////////////

//* Ottiene il contenuto del carrello
function getCartContent() {
  // Verifica se il carrello è presente nel local storage
  const cart = localStorage.getItem("cart");

  // Se il carrello esiste, lo restituisce come array di oggetti
  if (cart) {
    return JSON.parse(cart);
  }

  // Se il carrello non è presente, restituisce un array vuoto
  return [];
}

/////////////////////////////////////////////////////////

// Funzione per visualizzare i prodotti del carrello nella pagina
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");
  const cart = getCartContent();

  // Resetta il contenuto del container
  cartItemsContainer.innerHTML = "";

  // Mostra i prodotti del carrello
  cart.forEach((product) => {
    // Creazione degli elementi HTML
    const row = document.createElement("tr");

    const imageCell = document.createElement("td");
    const image = document.createElement("img");
    image.src = product.imageUrl;
    image.alt = product.name;
    image.classList.add("cart-product-image");
    imageCell.appendChild(image);

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;

    const brandCell = document.createElement("td");
    brandCell.textContent = product.brand;

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${product.price}`;

    const quantityCell = document.createElement("td");
    quantityCell.textContent = product.quantity;

    const totalCell = document.createElement("td");
    const total = product.price * product.quantity;
    totalCell.textContent = `$${total}`;

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Elimina";
    deleteButton.addEventListener("click", () => {
      removeFromCart(product._id);
      displayCartItems();
    });
    deleteCell.appendChild(deleteButton);

    // Inserisce gli elementi creati nella riga
    row.appendChild(imageCell);
    row.appendChild(nameCell);
    row.appendChild(brandCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(totalCell);
    row.appendChild(deleteCell);

    // Aggiunge la riga al container
    cartItemsContainer.appendChild(row);
  });

  // Calcola il totale del carrello
  const cartTotal = calculateCartTotal();
  cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
}

/////////////////////////////////////////////////////////

//* Funzione di init della pagina
document.addEventListener("DOMContentLoaded", () => {
  // Ottieni gli elementi del carrello dal localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Se il carrello è vuoto, mostra il messaggio "Il carrello è vuoto"
  if (cartItems.length === 0) {
    const cartEmptyMessage = document.getElementById("cartEmptyMessage");
    cartEmptyMessage.textContent = "Il carrello è vuoto";
  } else {
    // Altrimenti, popola la tabella con gli elementi del carrello
    displayCartItems();
  }
});


/////////////////////////////////////////////////////////

// Funzione per calcolare il totale del carrello
function calculateCartTotal() {
  const cart = getCartContent();
  let total = 0;

  cart.forEach((product) => {
    total += product.price * product.quantity;
  });

  return total;
}

//////////////////////////////////////////////////////////

function emptyCart() {
  // Ottieni l'array degli elementi nel carrello dal localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Verifica se il carrello è già vuoto
  if (cartItems.length === 0) {
    alert("Il carrello è già vuoto.");
    return;
  }

  // Mostra un messaggio di conferma all'utente
  const confirmMessage = "Sei sicuro di voler svuotare il carrello?";
  if (!window.confirm(confirmMessage)) {
    return;
  }

  // Svuota il carrello
  localStorage.setItem("cart", JSON.stringify([]));

  // Rimuovi tutti gli elementi visibili nel carrello
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  // Aggiorna la pagina
  window.location.reload();
}

const emptyCartButton = document.getElementById("emptyCartButton");

emptyCartButton.addEventListener("click", () => {
  emptyCart();
});

//////////////////////////////////////////////////////////

// Seleziona l'elemento del messaggio "Il carrello è vuoto"
const cartEmptyMessage = document.getElementById("cartEmptyMessage");

// Funzione per controllare se il carrello è vuoto
function isCartEmpty() {
  // Recupera il carrello dal localStorage
  const cartItems = getCartContent();

  // Restituisce true se il carrello è vuoto, altrimenti false
  return cartItems.length === 0;
}

// Funzione per mostrare o nascondere il messaggio "Il carrello è vuoto" in base allo stato del carrello
function toggleCartEmptyMessage() {
  cartEmptyMessage.style.display = isCartEmpty() ? "block" : "none";
}

// Chiamare la funzione toggleCartEmptyMessage all'avvio della pagina e ogni volta che il carrello viene aggiornato
toggleCartEmptyMessage();