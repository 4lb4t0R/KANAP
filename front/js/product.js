// récupération de l'ID du prooduit

const params = new URLSearchParams(document.location.search);
const id = params.get("_id");
console.log(id);

// récupération des infos du produit taggé via ID

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

  // fonction d'affichage des produits grâce/via leur ID

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
};

// choix des couleurs désirés pour le produit choisi

let choixCouleur = document.querySelector("#colors");
choixCouleur.addEventListener("input", (ec) => {
  let couleurProduit;
  couleurProduit = ec.target.value;
  articleClient.couleur = couleurProduit;
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(couleurProduit);
});

// choix du nombre de produit que l'on désire

let choixQuantitay = document.querySelector('input[id="quantity"]');
let quantitayProduit;
choixQuantitay.addEventListener("input", (eq) => {
  quantitayProduit = eq.target.value;
  articleClient.quantitay = quantitayProduit;
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(quantitayProduit);
});

// validation des choix pour ajout au panier

let choixProduit = document.querySelector("#addToCart");
choixProduit.addEventListener("click", () => {
  if (
    articleClient.quantitay < 1 ||
    articleClient.quantitay > 100 ||
    articleClient.quantitay === undefined ||
    articleClient.couleur === "" ||
    articleClient.couleur === undefined
  ) { alert("Pour valider votre choix, veuillez choisir une couleur, et/ou une quantité comprise entre 1 et 100");}
 else {Panier();
  console.log("clic effectué");
  document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
    document.querySelector("#addToCart").textContent = "Produit ajouté !";
  }
});

// création des tableaux servant à 'créer' le panier

let choixProduitClient=[];
let produitsEnregistred = [];
let produitsTemporaires = [];
let produitsaPousser = [];

// fonction d'ajout de produits dans panier vierge de base

function ajoutPremierProduit() {
  console.log(produitsEnregistred);
  if (produitsEnregistred === null) {
    choixProduitClient.push(articleClient);
    console.log(articleClient);
    return (localStorage.panierStocked = JSON.stringify(choixProduitClient));
  }
}

// fonction d'ajout de produits dans panier NON vierge de base

function ajoutAutreProduit() {
  produitsAPousser = [];
  produitsTemporaires.push(articleClient);
  produitsAPousser = [...produitsEnregistred, ...produitsTemporaires];
  produitsAPousser.sort(function triage(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    if (a._id = b._id){
      if (a.couleur < b.couleur) return -1;
      if (a.couleur > b.couleur) return 1;
    }
    return 0;
  });
  produitsTemporaires = [];
  return (localStorage.panierStocked = JSON.stringify(produitsAPousser));
}

// fonction d'alerte si choix double sur un même produit

function Panier() {
  produitsEnregistred = JSON.parse(localStorage.getItem("panierStocked"));
  if (produitsEnregistred) {
    for (let choix of produitsEnregistred) {
      if (choix._id === id && choix.couleur === articleClient.couleur) {
        alert("RAPPEL: Vous avez déja choisi cet article.");
        let additionQuantitay = parseInt(choix.quantitay) + parseInt(quantitayProduit);
        choix.quantitay = JSON.stringify(additionQuantitay);
        return (localStorage.panierStocked = JSON.stringify(produitsEnregistred));
      }
    }
    return ajoutAutreProduit();
  }
  return ajoutPremierProduit();
}
