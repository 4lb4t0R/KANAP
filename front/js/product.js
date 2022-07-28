//RECUPERATION DES INFOS

const params = new URLSearchParams(document.location.search);
const id = params.get("_id");
console.log(id);

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objetProduits) => {

 lesProduits(objetProduits);
  })
  .catch((err) => {
    document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api: " + err);
  });

  let articleClient = {};
  articleClient._id = id;


  //AFFICHAGE DES PRODUITS PAR ID

  function lesProduits(produit) {
    let imageAlt = document.querySelector("article div.item__img");
  let titre = document.querySelector("#title");
  let prix = document.querySelector("#price");
  let description = document.querySelector("#description");
  let couleurOption = document.querySelector("#colors");
  for (let choix of produit) {
    if (id === choix._id) {
        imageAlt.innerHTML = `<img src="${choix.imageUrl}" alt="${choix.altTxt}">`;
      titre.textContent = `${choix.name}`;
      prix.textContent = `${choix.price}`;
      description.textContent = `${choix.description}`;
      for (let couleur of choix.colors) {
        couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
      }
    }
  }
  console.log("affichage effectué");
}