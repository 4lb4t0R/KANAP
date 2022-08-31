
/*
 *  définit la zone où se situe l'ID pour ensuite aller le chercher
*/

window.location.href = `confirmation.html?commande=${data.orderId}`;


/*
*  récupération de l'ID de la commande contenue dans l'URL + injection via balise HTML sur page de confirmation 
*/

const orderID = document.querySelector("#orderId");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
orderID.innerHTML = urlParams.get("commande");