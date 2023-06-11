<!--* REGOLE -->

1. Crea un nuovo repository
2. Tutti gli extra sono facoltativi
3. Il compito di questa settimana e unico per tutte e due le lezioni. Svolgilo alla velocità che ritieni piu' opportuna. Hai tempo fino alla prima lezione del prossimo modulo.
4. E' l'ultimo compito del modulo, quindi e' normale che sia un po' piu' complesso
5. Richiedera' di utilizzare TUTTO quello che hai visto durante questo modulo!

<!--* ESERCIZI -->

1. Il tuo obiettivo è di creare un finto e-commerce con le funzionalità di gestione dei prodotti. Non sara' prevista alcuna funzionalita' di pagamento.
2. Le features da implementare sono:
   a. Una frontpage, dove si vedono tutti i prodotti
   b. Un back office da cui aggiungere nuovi prodotti e modificare quelli gia' esistenti
   c. Una pagina prodotto
3. Nel backoffice, implementa un form per aggiungere un nuovo prodotto al database. Il prodotto deve essere strutturato come nella prossima slide
4. Cliccando su un prodotto, l'utente deve essere reindirizzato ad una pagina prodotto. Passa l'id come query string nell'URL.
5. Nella pagina prodotto, mostra le informazioni del prodotto su cui si è cliccato. Puoi prendere le informazioni dall'endpoint "product/IL TUO ID QUI"
6. Nel backoffice, aggiungi la funzionalità per modificare un prodotto e un pulsante per eliminarlo.

{
"\_id": "5d318e1a8541744830bef139", <!--? GENERATO DAL SERVER -->
"name": "3310 cellphone", <!--! OBBLIGATORIO -->
"description": "An unforgettable icon.", <!--! OBBLIGATORIO -->
"brand": "Nokia" <!--! OBBLIGATORIO -->
"imageUrl": "https://bit.ly/3CE×jRa", <!--! OBBLIGATORIO -->
"price": 100, <!--! OBBLIGATORIO -->
"userId": "admin", <!--? GENERATO DAL SERVER -->
"createdAt": "2021-09-19T09:32:10.535Z", <!--? GENERATO DAL SERVER -->
"updatedAt": "2021-09-19T09:32:10.535Z", <!--? GENERATO DAL SERVER -->
"\_\_v": 0 <!--? GENERATO DAL SERVER -->
}

1. I campi che dicono "GENERATO DAL SERVER" non serve che siano inviati all'API.
2. L'endpoint è: https://striveschool-api.herokuapp.com/api/product/
3. Sia per GET che per POST. Per PUT e DELETE è necessario specificare l'id.
4. https://striveschool-api.herokuapp.com/api/product/:ID QUI
5. <!--! OGNI CHIAMATA DEVE ESSERE AUTENTICATA -->
6. Ogni richiesta a questo API deve includere un token per ottenere l'accesso. Puoi ottenere il token qui: https://strive.school/studentlogin

<!--* Esempio -->

fetch('https://striveschool-api.herokuapp.com/api/product/',{
headers: {
Authorization: 'Bearer xxxXXXXxxxxxxxxXX'
}
})

Dove ""XXXXXXXxxxxXXXXXX'' deve essere sostituito dal token preso dalla pagina
menzionata in precedenza.

<!--* CENTRO RISOLUZIONE PROBLEMI / FAQ -->

<!--? Imparare a leggere gli errori è fondamentale! -->

DOMANDA: Ricevo solo un array vuoto, perché?
RISPOSTA: L'API ti invierà solo i prodotti che TU hai aggiunti. Prova a creare qualcosa con POST e controlla di nuovo.

DOMANDA: Ricevo un errore 500, come posso risolvere?
RISPOSTA: Controlla nella network tab del tuo inspector per vedere l'errore specifico.
Solitamente:

1. Ti manca un field nel corpo
2. Hai una "duplicate key", cioè il nome del prodotto esiste già
3. Hai inviato il tipo sbagliato di dati (una stringa invece di un numero o simili)
