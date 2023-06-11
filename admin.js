////////////////////////////////////////////////////////////////////////

// Chiamata fetch al caricamento della pagina HTML per visualizzare i prodotti
document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
});

////////////////////////////////////////////////////////////////////////

// Funzione per gestire la chiamata fetch API
function fetchProducts() {
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNDc0ZWI5YzBmNzAwMTQ0ODRlZWIiLCJpYXQiOjE2ODYwMDE1MjksImV4cCI6MTY4NzIxMTEyOX0.WrSJW5vw05hgljeuXKRsR-98YAITqOeqZunlVDEdJJM";

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Risposta dalla chiamata API GET:", data);
      displayProducts(data); // Mostra i prodotti nel DOM
    })
    .catch((error) => {
      console.error(
        "Si è verificato un errore durante la chiamata API GET:",
        error
      );
    });
}

////////////////////////////////////////////////////////////////////////

// Funzione per mostrare i prodotti in tabella
function displayProducts(products) {
  const productListContainer = document.getElementById("productList");

  productListContainer.innerHTML = ""; // Resetta il contenuto del container

  products.forEach((product) => {
    const productRow = document.createElement("tr");
    productRow.innerHTML = `
          <td class="id-cell">${product._id}</td>
          <td><img src="${product.imageUrl}" alt="${product.name}" class="product-image"></td>
          <td>${product.name}</td>
          <td>${product.brand}</td>
          <td>${product.price} $</td>
          <td>
            <button class="btn btn-primary btn-edit m-1" data-product-id="${product._id}" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
            <button class="btn btn-danger btn-delete m-1">Delete</button>
          </td>
        `;

    // Aggiunge il listener al pulsante Delete
    const deleteButton = productRow.querySelector(".btn-delete");
    deleteButton.addEventListener("click", () => {
      const productId = product._id;
      const shouldDelete = confirm(
        "Sei sicuro di voler eliminare questo prodotto?"
      );
      // Messaggio di conferma
      if (shouldDelete) {
        deleteProduct(productId);
      }
    });

    // Aggiunge il listener al pulsante Edit
    const updateButton = productRow.querySelector(".btn-edit");
    updateButton.addEventListener("click", (event) => {
      // Imposta i valori del prodotto nella modale di modifica
      const productId = event.target.dataset.productId;

      // Cerca prodotto con ID uguale a data-product-id e lo assegna a product
      const product = products.find((product) => product._id === productId);

      // Popola i campi del form con i valori del prodotto esistente
      document.getElementById("editProductName").value = product.name;
      document.getElementById("editProductDescription").value =
        product.description;
      document.getElementById("editProductBrand").value = product.brand;
      document.getElementById("editProductImageURL").value = product.imageUrl;
      document.getElementById("editProductPrice").value = product.price;

      // Imposta l'ID del prodotto nel <span> nascosto della modale
      document.getElementById("productId").textContent = productId;

      // Apri la modale di modifica
      const editModal = new bootstrap.Modal(
        document.getElementById("editModal")
      );
      editModal.show();
    });

    productListContainer.appendChild(productRow);
  });
}

////////////////////////////////////////////////////////////////////////

// Funzione per cancellare un prodotto
function deleteProduct(productId) {
  const url = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNDc0ZWI5YzBmNzAwMTQ0ODRlZWIiLCJpYXQiOjE2ODYwMDE1MjksImV4cCI6MTY4NzIxMTEyOX0.WrSJW5vw05hgljeuXKRsR-98YAITqOeqZunlVDEdJJM";

  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Risposta dalla chiamata API DELETE:", data);
      // Dopo la cancellazione, aggiorna la lista prodotti
      fetchProducts();
    })
    .catch((error) => {
      console.error(
        "Si è verificato un errore durante la chiamata API DELETE:",
        error
      );
    });
}

////////////////////////////////////////////////////////////////////////

// Funzione per mostrare la modale al click del pulsante
function openCreateProductModal() {
  const createProductModal = new bootstrap.Modal(
    document.getElementById("createProductModal")
  );
  createProductModal.show();
}

////////////////////////////////////////////////////////////////////////

// Aggiunge il listener al pulsante per aprire la modale
const addButton = document.getElementById("addProductButton");
addButton.addEventListener("click", openCreateProductModal);

////////////////////////////////////////////////////////////////////////

// Funzione per gestire la creazione di un nuovo prodotto
function createProduct(product) {
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNDc0ZWI5YzBmNzAwMTQ0ODRlZWIiLCJpYXQiOjE2ODYwMDE1MjksImV4cCI6MTY4NzIxMTEyOX0.WrSJW5vw05hgljeuXKRsR-98YAITqOeqZunlVDEdJJM";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Risposta dalla chiamata API POST:", data);

      // Aggiorna la tabella dei prodotti
      fetchProducts();

      // Aggiorna la pagina
      location.reload();
    })
    .catch((error) => {
      console.error(
        "Si è verificato un errore durante la chiamata API POST:",
        error
      );
    });
}

////////////////////////////////////////////////////////////////////////

// Funzione per gestire l'invio dei dati nella modale
document.addEventListener("DOMContentLoaded", function () {
  // Aggiunge il listener al form per gestire l'invio
  const addProductForm = document.getElementById("addProductForm");
  addProductForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Impedisce il refresh della pagina

    // Ottiene i valori dei campi del modulo
    const productName = document.getElementById("productName").value;
    const productDescription =
      document.getElementById("productDescription").value;
    const productBrand = document.getElementById("productBrand").value;
    const productImageURL = document.getElementById("productImageURL").value;
    const productPrice = document.getElementById("productPrice").value;

    // Crea un oggetto prodotto con i dati del modulo
    const newProduct = {
      name: productName,
      description: productDescription,
      brand: productBrand,
      imageUrl: productImageURL,
      price: productPrice,
    };

    // Mostra un messaggio di conferma con un alert del browser
    const shouldAdd = confirm(
      "Sei sicuro di voler aggiungere questo prodotto?"
    );
    // Messaggio di conferma
    if (shouldAdd) {
      // Esegue la chiamata fetch POST per creare il nuovo prodotto
      createProduct(newProduct);
    }
  });
});

////////////////////////////////////////////////////////////////////////

// Funzione per gestire la modifica del prodotto
async function updateProduct(productId, updatedProduct) {
  try {
    const url = "https://striveschool-api.herokuapp.com/api/product/";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNDc0ZWI5YzBmNzAwMTQ0ODRlZWIiLCJpYXQiOjE2ODYwMDE1MjksImV4cCI6MTY4NzIxMTEyOX0.WrSJW5vw05hgljeuXKRsR-98YAITqOeqZunlVDEdJJM";

    // Effettua la chiamata fetch PUT
    const response = await fetch(`${url}${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProduct),
    });

    const updatedProductData = await response.json();
    console.log("Prodotto aggiornato:", updatedProductData);

    // Aggiorna la pagina
    location.reload();
  } catch (error) {
    console.error("Errore durante l'aggiornamento del prodotto:", error);
  }
}
////////////////////////////////////////////////////////////////////////

// Funzione per gestire l'invio dei dati nella modale di modifica
document.addEventListener("DOMContentLoaded", function () {
  // Aggiunge il listener al form per gestire l'invio
  const editProductForm = document.getElementById("editProductForm");
  editProductForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Impedisce il refresh della pagina

    // Ottiene i valori dei campi del modulo di modifica
    const editedProductName = document.getElementById("editProductName").value;
    const editedProductDescription = document.getElementById(
      "editProductDescription"
    ).value;
    const editedProductBrand =
      document.getElementById("editProductBrand").value;
    const editedProductImageURL = document.getElementById(
      "editProductImageURL"
    ).value;
    const editedProductPrice =
      document.getElementById("editProductPrice").value;

    // Crea un oggetto prodotto con i dati modificati
    const editedProduct = {
      name: editedProductName,
      description: editedProductDescription,
      brand: editedProductBrand,
      imageUrl: editedProductImageURL,
      price: editedProductPrice,
    };

    // Ottiene l'ID del prodotto in modifica
    const productId = document.getElementById("productId").textContent;

    // Mostra un messaggio di conferma con un alert del browser
    const shouldEdit = confirm(
      "Sei sicuro di voler modificare questo prodotto?"
    );
    // Messaggio di conferma
    if (shouldEdit) {
      // Esegue la chiamata fetch per aggiornare il prodotto
      updateProduct(productId, editedProduct);
    }
  });
});

////////////////////////////////////////////////////////////////////////

// Seleziona il pulsante "Carica JSON"
const loadJSONButton = document.querySelector("#loadJSONButton");

// Aggiungi l'evento click al pulsante
loadJSONButton.addEventListener("click", loadJSON);

// Funzione per caricare gli elementi del JSON tramite chiamate API POST
async function loadJSON() {
  try {
    let successfulRequests = 0;

    jsonData.forEach(async (product, index) => {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/product/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNDc0ZWI5YzBmNzAwMTQ0ODRlZWIiLCJpYXQiOjE2ODYwMDE1MjksImV4cCI6MTY4NzIxMTEyOX0.WrSJW5vw05hgljeuXKRsR-98YAITqOeqZunlVDEdJJM",
          },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
        console.log(`Elemento ${index + 1} caricato con successo!`);
        successfulRequests++;
      } else {
        console.error(
          `Errore durante il caricamento dell'elemento ${index + 1}.`
        );
      }

      if (successfulRequests === jsonData.length) {
        // Tutte le chiamate API sono state completate con successo
        alert("Caricamento completato!");
        location.reload();
      }
    });
  } catch (error) {
    console.error(
      "Si è verificato un errore durante la chiamata API POST:",
      error
    );
  }
}

// Il mio file JSON
const jsonData = [
  {
    name: "Costume Gonfiabile",
    description: "Tuta Intera per Feste in Maschera",
    brand: "ZAYZ",
    imageUrl: "https://m.media-amazon.com/images/I/41u8KATzDnL._AC_SL1024_.jpg",
    price: 64,
  },
  {
    name: "Costume da Dinosauro Gonfiabile",
    description:
      "Cuciture doppie ed elastiche, per evitare la fuoriuscita di aria. 100% Poliestere.\n",
    brand: "Morph",
    imageUrl: "https://m.media-amazon.com/images/I/51LN1PYWg5L._AC_UX679_.jpg",
    price: 45,
  },
  {
    name: "Vibratore per Donna con Telecomando",
    description:
      "Con 10 Modalità Vibratorie. Questo vibratore realistico è progettato per offrire piacere intenso alle donne. Dotato di funzione di squirting, riproduce in modo realistico la sensazione di un vero pene. È anche dotato di un vibratore per il punto G e il punto G-spot per offrire una stimolazione mirata. Questo vibratore versatile è un ottimo giocattolo sessuale per le donne, in grado di stimolare sia il clitoride che il punto G.",
    brand: "Qiannnel",
    imageUrl: "https://m.media-amazon.com/images/I/617OcNkjpHL._AC_SX679_.jpg",
    price: 28,
  },
  {
    name: "Massaggiatore Elettrico",
    description:
      "Il massaggiatore utilizza silicone di grado. È inodore, non facile da deformare e rompere ed è innocuo per il corpo umano. Puoi usarlo con fiducia.",
    brand: "AZOI",
    imageUrl: "https://m.media-amazon.com/images/I/61XkiEtnNzL._AC_SX679_.jpg",
    price: 29,
  },
  {
    name: "Set di Lingerie in Pizzo",
    description:
      "Splendido set di lingerie sexy in pizzo, perfetto per rendere ogni momento speciale e seducente. Questo set è disponibile in diversi colori per soddisfare ogni preferenza e include un reggiseno imbottito e mutandine coordinate. Il design raffinato e i dettagli di alta qualità lo rendono un capo unico nel suo genere. Sentiti bella e sicura di te con questo set di lingerie irresistibile.",
    brand: "Victoria's Secret",
    imageUrl: "https://m.media-amazon.com/images/I/61YD6pqTq4S._AC_UL600_FMwebp_QL65_.jpg",
    price: 39,
  },
  {
    name: "Kit di Bondage per Coppie",
    description:
      "Esplora nuove frontiere dell'intimità e del piacere con questo kit di bondage completo. Realizzato con materiali di alta qualità e attenzione ai dettagli, il kit include tutto ciò di cui hai bisogno per sperimentare giochi di dominazione e sottomissione in modo sicuro e consensuale. Il set comprende manette regolabili, una frusta sensuale, un bavaglio e una benda per gli occhi. Lasciati trasportare in un mondo di desiderio e passione con questo kit di bondage elegante e stimolante.",
    brand: "Fifty Shades of Grey",
    imageUrl: "https://m.media-amazon.com/images/I/81qRUxyH56L._AC_UL600_FMwebp_QL65_.jpg",
    price: 59,
  },
  {
    name: "Mutandine Vibranti a Distanza",
    description:
      "Esplora il piacere senza limiti con queste mutandine vibranti controllate a distanza. Realizzate con materiali morbidi e confortevoli, queste mutandine sono dotate di un potente vibratore che può essere controllato da remoto. Goditi l'eccitazione e la suspense di lasciare il controllo nelle mani del tuo partner. Le mutandine vibranti sono perfette per giochi intimi e piccanti momenti di complicità. Scopri una nuova dimensione del piacere con queste mutandine vibranti innovative e divertenti.",
    brand: "Lovehoney",
    imageUrl: "https://m.media-amazon.com/images/I/51Qy8aVls0L._AC_UL600_FMwebp_QL65_.jpg",
    price: 29,
  },
  {
    name: "Frusta Fetish in Pelle",
    description:
      "Esplora il mondo del BDSM con questa frusta fetish in pelle. Realizzata con materiali di alta qualità, questa frusta offre un'esperienza di dominazione e sottomissione intensa e appagante. Il manico solido e la lunga coda in pelle garantiscono un controllo preciso e una sensazione decisa. Sperimenta il brivido della frusta sulla pelle e lasciati trasportare in un mondo di desiderio e piacere. Aggiungi un tocco di erotismo e sensualità alle tue sessioni di gioco con questa frusta fetish esclusiva.",
    brand: "Strict Leather",
    imageUrl: "https://m.media-amazon.com/images/I/515tP0j7yHL._AC_UL600_FMwebp_QL65_.jpg",
    price: 19,
  },
  {
    name: "Manette in Metallo",
    description:
      "Immergiti nella passione e nella sensualità con queste manette in metallo. Realizzate con materiali resistenti e di qualità, queste manette garantiscono una sicurezza totale durante i giochi di ruolo. Le manette regolabili si adattano comodamente al polso e si bloccano con un meccanismo a chiave per una maggiore tranquillità. Sperimenta l'eccitazione di essere legato o legare il tuo partner per un'esperienza intensa e indimenticabile. Aggiungi un tocco di mistero e seduzione alle tue avventure erotiche con queste manette eleganti e robuste.",
    brand: "Pipedream",
    imageUrl: "https://m.media-amazon.com/images/I/41+kPRopEQL._AC_UL600_FMwebp_QL65_.jpg",
    price: 14,
  },
  {
    name: "Dildo con Cinturino Regolabile",
    description:
      "Esplora nuove dimensioni del piacere con questo dildo con cinturino regolabile. Realizzato con materiali di alta qualità e design ergonomico, questo dildo offre una stimolazione intensa e soddisfacente. Il cinturino regolabile si adatta comodamente a diverse misure, consentendo a entrambi i partner di godere di un'intimità condivisa. Sperimenta sensazioni nuove ed eccitanti con questo dildo versatile e stimolante. Lasciati trasportare in un mondo di piacere e complicità con questo giocattolo erotico unico nel suo genere.",
    brand: "Doc Johnson",
    imageUrl: "https://m.media-amazon.com/images/I/61jgzAB7ueL._AC_UL600_FMwebp_QL65_.jpg",
    price: 49,
  },
  {
    name: "Plug Anale in Silicone con Base Gioiello",
    description:
      "Aggiungi un tocco di lusso e seduzione alle tue esperienze intime con questo plug anale in silicone con base gioiello. Realizzato con materiali di alta qualità, questo plug offre un'esperienza di piacere intensa e sicura. La forma ergonomica e la consistenza liscia consentono un inserimento agevole e confortevole. La base gioiello aggiunge un tocco elegante e sensuale al plug, rendendolo perfetto per giochi anali avvincenti. Sperimenta sensazioni nuove e piacevoli con questo plug anale di alta qualità e design esclusivo.",
    brand: "Tantus",
    imageUrl: "https://m.media-amazon.com/images/I/31nxEX+t7HL._AC_UL600_FMwebp_QL65_.jpg",
    price: 24,
  },
  {
    name: "Olio per Massaggi Erotici",
    description:
      "Scopri l'arte del massaggio erotico con questo olio sensuale per massaggi. Formulato con ingredienti di alta qualità, questo olio offre una texture setosa e un profumo avvolgente. Lasciati trasportare in un mondo di relax e intimità mentre massaggi l'olio sul corpo del tuo partner, stimolando i sensi e creando un'atmosfera sensuale. Goditi momenti di complicità e piacere con questo olio per massaggi erotici unico nel suo genere.",
    brand: "Kama Sutra",
    imageUrl: "https://m.media-amazon.com/images/I/71QZf4X8GrL._AC_UL600_FMwebp_QL65_.jpg",
    price: 12,
  },
  {
    name: "Collare S&M in Pelle con Catena di Metallo",
    description:
      "Aggiungi un tocco di eleganza e sottomissione ai tuoi giochi erotici con questo collare S&M in pelle. Realizzato con materiali di alta qualità, questo collare offre un'esperienza di dominazione e sottomissione intensa e raffinata. Il design elegante e la catena di metallo aggiungono un tocco sensuale al collare, creando un'atmosfera di mistero e desiderio. Sperimenta l'eccitazione di indossare o di far indossare il collare al tuo partner per un'esperienza unica ed emozionante.",
    brand: "Master Series",
    imageUrl: "https://m.media-amazon.com/images/I/61Kkbsn3SeL._AC_UL600_FMwebp_QL65_.jpg",
    price: 34,
  },
  {
    name: "Pinze Regolabili per Capezzoli",
    description:
      "Esplora le profondità del piacere con queste pinze regolabili per capezzoli. Realizzate con materiali di alta qualità e design ergonomico, queste pinze offrono una stimolazione intensa e personalizzabile. Regola l'intensità delle pinze in base alle tue preferenze per sperimentare sensazioni uniche e indimenticabili. Lasciati trasportare in un mondo di piacere e sensualità con queste pinze per capezzoli versatili e stimolanti.",
    brand: "Nippleicious",
    imageUrl: "https://m.media-amazon.com/images/I/51cqKjJtFvL._AC_UL600_FMwebp_QL65_.jpg",
    price: 9,
  },
  {
    name: "Altalena del Sesso",
    description:
      "Raggiungi nuove vette di piacere e sperimenta posizioni avventurose con questa altalena del sesso. Realizzata con materiali resistenti e sicuri, questa altalena offre un supporto comodo e affidabile per esplorare posizioni sessuali al di fuori della norma. L'altalena è regolabile e facile da installare, consentendo di creare un'atmosfera di eccitazione e piacere. Lasciati trasportare in un mondo di avventure erotiche con questa altalena del sesso versatile e stimolante.",
    brand: "Fetish Fantasy",
    imageUrl: "https://m.media-amazon.com/images/I/41cy0vlXI2L._AC_UL600_FMwebp_QL65_.jpg",
    price: 89,
  },
  {
    name: "Bambola Sessuale Gonfiabile Realistica",
    description:
      "Esplora fantasie e desideri con questa bambola sessuale gonfiabile realistica. Realizzata con materiali di alta qualità, questa bambola offre un'esperienza di intimità e piacere straordinariamente realistica. Il corpo dettagliato e le funzioni realistiche rendono l'esperienza coinvolgente e appagante. Soddisfa le tue fantasie e vivi momenti di passione e complicità con questa bambola sessuale realistica e appassionante.",
    brand: "YunLoves",
    imageUrl: "https://m.media-amazon.com/images/I/71HbEoT8vvL._AC_UL600_FMwebp_QL65_.jpg",
    price: 99,
  },
];
