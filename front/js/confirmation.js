
// récupération du numéro de commande

const orderID = document.querySelector("#orderId");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
orderID.innerHTML = urlParams.get("commande");

// affichage du numéro de la commande

window.location.href = `confirmation.html?commande=${data.orderId}`;