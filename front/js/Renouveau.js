
// Sécurité d'affichage de la page

const page = document.location.href;

// Récupération du panier

fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((objetProduits) => {
    console.log(objetProduits);

    // appel de la fonction d'affichage du panier

    affichagePanier(objetProduits);
})
.catch((err) => {
    document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api: " + err);
});
     let panier = JSON.parse(localStorage.getItem("panierStocké"));
    
    // Conditions d'affichage du panier 

    function affichagePanier(index) {
      let panier = JSON.parse(localStorage.getItem("panierStocké"));
       if (panier && panier.length != 0) {
        for (let choix of panier) {
          console.log(choix);
          for (let g = 0, h = index.length; g < h; g++) {
            if (choix._id === index[g]._id) {
              choix.name = index[g].name;
              choix.prix = index[g].price;
              choix.image = index[g].imageUrl;
              choix.description = index[g].description;
              choix.alt = index[g].altTxt;
            }
          }
        }
        affiche(panier);
      } else {
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
        document.querySelector("h1").innerHTML =
          "Vous n'avez pas d'article(s) dans votre panier";
      }
      modifQuantité();
      suppression();
    }
    
    // insertion des infos produits retenus via injection par mappage

    function affiche(indexé) {
      let zonePanier = document.querySelector("#cart__items");
      zonePanier.innerHTML += indexé.map((choix) => 
      `<article class="cart__item" data-id="${choix._id}" data-couleur="${choix.couleur}" data-quantité="${choix.quantité}" data-prix="${choix.prix}"> 
        <div class="cart__item__img">
          <img src="${choix.image}" alt="${choix.alt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${choix.name}</h2>
            <span>couleur : ${choix.couleur}</span>
            <p data-prix="${choix.prix}">${choix.prix} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choix.quantité}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" data-id="${choix._id}" data-couleur="${choix.couleur}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
        ).join("");
      totalProduit();
    }
    
    // fonction permettant de choisir la quantité désirée sur un produit, et la modifier dynamiquement

    function modifQuantité() {
      const cart = document.querySelectorAll(".cart__item");
      cart.forEach((cart) => {
        cart.addEventListener("change", (eq) => {
          let panier = JSON.parse(localStorage.getItem("panierStocké"));
          for (article of panier)
            if (
              article._id === cart.dataset.id &&
              cart.dataset.couleur === article.couleur
            ) {
              article.quantité = eq.target.value;
              localStorage.panierStocké = JSON.stringify(panier);
              cart.dataset.quantité = eq.target.value;
              totalProduit();
            }
        });
      });
    }

    // fonction permettant de supprimer dynamiquement un article de son panier

    function suppression() {
      const cartdelete = document.querySelectorAll(".cart__item .deleteItem");
      cartdelete.forEach((cartdelete) => {
        cartdelete.addEventListener("click", () => { 
          let panier = JSON.parse(localStorage.getItem("panierStocké"));
          for (let d = 0, c = panier.length; d < c; d++)
            if (
              panier[d]._id === cartdelete.dataset.id &&
              panier[d].couleur === cartdelete.dataset.couleur
            ) {
              const num = [d];
              let nouveauPanier = JSON.parse(localStorage.getItem("panierStocké"));
              nouveauPanier.splice(num, 1);
              if (nouveauPanier && nouveauPanier.length == 0) { 
                document.querySelector("#totalQuantity").innerHTML = "0";
                document.querySelector("#totalPrice").innerHTML = "0";
                document.querySelector("h1").innerHTML =
                  "Vous n'avez pas d'article(s) dans votre panier";
              }
              localStorage.panierStocké = JSON.stringify(nouveauPanier);
              totalProduit(); 
              return location.reload();
            }
        });
      });
    }

    // fonction calculant et affichant dynamiquement la somme du prix des produits du panier

    function totalProduit() {
      let totalArticle = 0;
      let totalPrix = 0;
      const cart = document.querySelectorAll(".cart__item");
      cart.forEach((cart) => {
        totalArticle += JSON.parse(cart.dataset.quantité);
        totalPrix += cart.dataset.quantité * cart.dataset.prix;
      });
      document.getElementById("totalQuantity").textContent = totalArticle;
      document.getElementById("totalPrice").textContent = totalPrix;
    }
    
   
// Ajout des Regex

let form = document.querySelector(".cart__order__form")
console.log(form);

//Création des expressions régulières

let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let charRegExp = new RegExp("^[a-zA-ZÀ-ÿ '-]+$"); // Accepte les lettres + accents, apostrophes et tirets
let addressRegExp = new RegExp("^[a-zA-ZÀ-ÿ0-9 '-]+$") // Accepte chiffres, lettres + accents, apostrophes et tirets

// Ecoute de la modification des champs du formulaire

form.firstName.addEventListener ('change', function(){
  validFirstName(this);
});
form.lastName.addEventListener ('change', function(){
  validLastName(this);
});
form.address.addEventListener ('change', function(){
  validAddress(this);
});
form.city.addEventListener ('change', function(){
  validCity(this);
});
form.email.addEventListener ('change', function(){
  validEmail(this);
});

//Validation du prénom

const validFirstName = function(inputFirstName) {
  if (charRegExp.test(inputFirstName.value) == false) {
   document.getElementById("firstNameErrorMsg").innerHTML = 'Il y a une erreur dans votre prénom ! Attention les caractères spéciaux ne sont pas autorisés.';
   return false
  }
  else {
    document.getElementById("firstNameErrorMsg").innerHTML = '';
    return true
  }
};

//Validation du nom

const validLastName = function(inputLastName) {
  if (charRegExp.test(inputLastName.value) == false) {
    document.getElementById("lastNameErrorMsg").innerHTML = 'Il y a une erreur dans votre nom ! Attention les caractères spéciaux ne sont pas autorisés.';
    return false
  } 
  else {
    document.getElementById("lastNameErrorMsg").innerHTML = '';
    return true
  }
};

// Validation de l'adresse

const validAddress = function(inputAddress) {
  if (addressRegExp.test(inputAddress.value) == false) {
    document.getElementById("addressErrorMsg").innerHTML = 'Il y a une erreur dans votre adresse ! Attention les caractères spéciaux ne sont pas autorisés.';
    return false 
  } 
  else {
    document.getElementById("addressErrorMsg").innerHTML = '';
    return true
  }
};

// Validation de la ville

const validCity = function(inputCity) {
  if (charRegExp.test(inputCity.value) == false) {
    document.getElementById("cityErrorMsg").innerHTML = 'Êtes-vous certain(e) d\'habiter ici ? Attention les caractères spéciaux ne sont pas autorisés.' ;
    return false
  } 
  else {
    document.getElementById("cityErrorMsg").innerHTML = '';
    return true
  }
};

// Validation de l'email

const validEmail = function(inputEmail) {
  if (emailRegExp.test(inputEmail.value) == false) {
    document.getElementById("emailErrorMsg").innerHTML = 'Attention il y a une erreur dans votre email !';
    return false
  }
  else {
    document.getElementById("emailErrorMsg").innerHTML = '';
    return true
  }
};




//----------------------------------------------------------------
// Envoi de la commande
//----------------------------------------------------------------
if (page.match("cart")) {
  let commande = document.querySelector("#order");
  commande.addEventListener("click", (e) => {
    // empeche de recharger la page on prévient le reload du bouton
    e.preventDefault();
    
    envoiPaquet();
   
  });
}
//----------------------------------------------------------------
// fonction récupérations des id puis mis dans un tableau
//----------------------------------------------------------------
// définition du panier quine comportera que les id des produits choisi du local storage
let panierId = [];
function tableauId() {
// appel des ressources
let panier = JSON.parse(localStorage.getItem("panierStocké"));
// récupération des id produit dans panierId
if (panier && panier.length > 0) {
  for (let indice of panier) {
    panierId.push(indice._id);
  }
} else {
  console.log("le panier est vide");
  document.querySelector("#order").setAttribute("value", "Panier vide!");
}
}
function paquet() {
  contactRef = JSON.parse(localStorage.getItem("contactClient"));}
//----------------------------------------------------------------
// fonction sur la validation de l'envoi
//----------------------------------------------------------------

function envoiPaquet() {
  tableauId();
  paquet();
  // vision sur le paquet que l'on veut envoyer
  console.log(commandeFinale);
  let somme = contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;
  // si le panierId contient des articles et que le clic est autorisé
  if (panierId.length != 0 && somme === 5) {
    // envoi à la ressource api
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commandeFinale),
    })
      .then((res) => res.json())
      .then((data) => {
        // envoyé à la page confirmation, autre écriture de la valeur "./confirmation.html?commande=${data.orderId}"
        window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
      })
      .catch(function (err) {
        console.log(err);
        alert("erreur");
      });
  }
}

//------------------------------------------------------------
// fonction affichage autoinvoquée du numéro de commande et vide du storage lorsque l'on est sur la page confirmation
//------------------------------------------------------------
(function Commande() {
  if (page.match("confirmation")) {
    sessionStorage.clear();
    localStorage.clear();
    // valeur du numero de commande
    let numCom = new URLSearchParams(document.location.search).get("commande");
    // merci et mise en page
    document.querySelector("#orderId").innerHTML = `<br>${numCom}<br>Merci pour votre achat`;
    console.log("valeur de l'orderId venant de l'url: " + numCom);
    //réinitialisation du numero de commande
    numCom = undefined;
  } else {
    console.log("sur page cart");
  }
})();