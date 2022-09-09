
// appel de l'API

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objetProduits) => {
      //console.log(objetProduits);
      // appel de la fonction affichagePanier
      affichagePanier(objetProduits);
  })
  .catch((err) => {
      document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api: " + err);
  });

// fonction régissant l'affichage du panier

function affichagePanier(index) {

  let panier = JSON.parse(localStorage.getItem("panierStocked"));
  //console.log('panier');
  //console.log(panier);
   if (panier && panier.length != 0) {
    for (let choix of panier) {
      //console.log(choix);
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

// affichage du panier injecté via mappage

function affiche(index) {
  let zonePanier = document.querySelector("#cart__items");
  zonePanier.innerHTML += index.map((choix) => 
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

// modifications dynamiques du panier

function modifQuantité() {
  const cart = document.querySelectorAll(".cart__item");
  cart.forEach((cart) => {
    cart.addEventListener("change", (eq) => {
      let panier = JSON.parse(localStorage.getItem("panierStocked"));
      for (article of panier)
        if (
          article._id === cart.dataset.id &&
          cart.dataset.couleur === article.couleur
        ) {
          article.quantité = eq.target.value;
          localStorage.panierStocked = JSON.stringify(panier);
          cart.dataset.quantité = eq.target.value;
          totalProduit();
        }
    });
  });
}

// suppression dynamique du panier 

function suppression() {
  const cartdelete = document.querySelectorAll(".cart__item .deleteItem");
  cartdelete.forEach((cartdelete) => {
    cartdelete.addEventListener("click", () => {
      let panier = JSON.parse(localStorage.getItem("panierStocked"));
      for (let d = 0, c = panier.length; d < c; d++)
        if (
          panier[d]._id === cartdelete.dataset.id &&
          panier[d].couleur === cartdelete.dataset.couleur
        ) {
          const num = [d];
          let nouveauPanier = JSON.parse(localStorage.getItem("panierStocked"));
          nouveauPanier.splice(num, 1);
          if (nouveauPanier && nouveauPanier.length == 0) {
            document.querySelector("#totalQuantity").innerHTML = "0";
            document.querySelector("#totalPrice").innerHTML = "0";
            document.querySelector("h1").innerHTML =
              "Vous n'avez pas d'article(s) dans votre panier";
          }
          localStorage.panierStocked = JSON.stringify(nouveauPanier);
          totalProduit(); 
          return location.reload();
        }
    });
  });
}

 // fonction d'affichage et de calcul du total de la commande, dynamique

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

// création du formulaire de commande

// les données du client seront stockées dans ce tableau pour la commande sur page panier
  let contactClient = {};
  localStorage.contactClient = JSON.stringify(contactClient);
  let prenom = document.querySelector("#firstName");
  prenom.classList.add("regex_texte");
  let nom = document.querySelector("#lastName");
  nom.classList.add("regex_texte");
  let ville = document.querySelector("#city");
  ville.classList.add("regex_texte");
  let adresse = document.querySelector("#address");
  adresse.classList.add("regex_adresse");
  let email = document.querySelector("#email");
  email.classList.add("regex_email");
  email.setAttribute("type", "text");
  let regexTexte = document.querySelectorAll(".regex_texte");

// création des regex

let regexLettre = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
let regexChiffreLettre = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
let regValideEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
let regMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;

// sécurité du champ de saisie du nom + prenom

  regexTexte.forEach((securInp) =>
  securInp.addEventListener("input", (e) => {
      let valeur = e.target.value;
      let regNormal = valeur.search(regexLettre);
      if (regNormal === 0) {
        contactClient[e.target.id] = valeur;
      }
      if (
        contactClient.city !== "" &&
        contactClient.lastName !== "" &&
        contactClient.firstName !== "" &&
        regNormal === 0
      ) {
        contactClient.regexNormal = 3;
      } else {
        contactClient.regexNormal = 0;
      }
      localStorage.contactClient = JSON.stringify(contactClient);
      couleurRegex(regNormal, valeur, securInp);
      
    })
  );

// regex d'affichage de msg d'erreurs si erreur il y a (sur nom prenom ou ville)

texteInfo(regexLettre, "#firstNameErrorMsg", prenom);
texteInfo(regexLettre, "#lastNameErrorMsg", nom);
texteInfo(regexLettre, "#cityErrorMsg", ville);

// sécurité du champ de saisie de l'adresse

  let regexAdresse = document.querySelector(".regex_adresse");
  regexAdresse.addEventListener("input", (e) => {
    valeur = e.target.value;
    let regAdresse = valeur.search(regexChiffreLettre);
    if (regAdresse == 0) {
      contactClient.address = adresse.value;
    }
    if (contactClient.address !== "" && regAdresse === 0) {
      contactClient.regexAdresse = 1;
    } else {
      contactClient.regexAdresse = 0;
    }
    localStorage.contactClient = JSON.stringify(contactClient);
    couleurRegex(regAdresse, valeur, regexAdresse);
    
  });

// regex d'affichage du message d'erreur si erreur il y a (sur l'adresse)

texteInfo(regexChiffreLettre, "#addressErrorMsg", adresse);

// sécurité du champ de saisie de l'email

  let regexEmail = document.querySelector(".regex_email");
  regexEmail.addEventListener("input", (e) => {
    valeur = e.target.value;
    let regMatch = valeur.match(regMatchEmail);
    let regValide = valeur.search(regValideEmail);
    if (regValide === 0 && regMatch !== null) {
      contactClient.email = email.value;
      contactClient.regexEmail = 1;
    } else {
      contactClient.regexEmail = 0;
    }
    localStorage.contactClient = JSON.stringify(contactClient);
    couleurRegex(regValide, valeur, regexEmail);
    
  });

// affichage du message d'erreur pour l'email, si erreur il y a

  email.addEventListener("input", (e) => {
    valeur = e.target.value;
    let regMatch = valeur.match(regMatchEmail);
    let regValide = valeur.search(regValideEmail);
    if (valeur === "" && regMatch === null) {
      document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner votre email.";
      document.querySelector("#emailErrorMsg").style.color = "white";
    } else if ( regValide !== 0) {
      document.querySelector("#emailErrorMsg").innerHTML = "Caractère(s) non valide(s)";
      document.querySelector("#emailErrorMsg").style.color = "white";
    } else if (valeur != "" && regMatch == null) {
      document.querySelector("#emailErrorMsg").innerHTML = "Caratère(s) accepté(s) pour ce champ. Forme email non conforme";
      document.querySelector("#emailErrorMsg").style.color = "white";
    } else {
      document.querySelector("#emailErrorMsg").innerHTML = "Forme email conforme.";
      document.querySelector("#emailErrorMsg").style.color = "white";
    }
  });

// fonction d'aide visuelle selon le remplissage des champs, et si il y a des erreurs ou non

let valeurEcoute = "";
function couleurRegex(regSearch, valeurEcoute, inputAction) {
  if (valeurEcoute === "" && regSearch != 0) {
    inputAction.style.backgroundColor = "white";
    inputAction.style.color = "black";
  } else if (valeurEcoute !== "" && regSearch != 0) {
    inputAction.style.backgroundColor = "rgb(220, 50, 50)";
    inputAction.style.color = "white";
  } else {
    inputAction.style.backgroundColor = "rgb(0, 138, 0)";
    inputAction.style.color = "white";
  }
}

// fonction d'affichage des messages d'erreurs regex (sauf email)

function texteInfo(regex, pointage, zoneEcoute) {
      
      zoneEcoute.addEventListener("input", (e) => {
      valeur = e.target.value;
      index = valeur.search(regex);
      if (valeur === "" && index != 0) {
        document.querySelector(pointage).textContent = "Veuillez renseigner ce champ.";
        document.querySelector(pointage).style.color = "white";
      } else if (valeur !== "" && index != 0) {
        document.querySelector(pointage).innerHTML = "Reformulez cette donnée";
        document.querySelector(pointage).style.color = "white";
      } else {
      document.querySelector(pointage).innerHTML = "Caratères acceptés pour ce champ.";
      document.querySelector(pointage).style.color = "white";
      }
    });
  }


  let commande = document.querySelector("#order");

// envoi de la commande validée

  commande.addEventListener("click", (e) => {
    e.preventDefault();
    
    envoiPaquet();
    sessionStorage.clear();
  localStorage.clear();
  });
  

// stockage des ID du panier final dans un tableau

let panierId = [];
function tableauId() {
let panier = JSON.parse(localStorage.getItem("panierStocked"));
if (panier && panier.length > 0) {
  for (let indice of panier) {
    panierId.push(indice._id);
  }
} else {
  console.log("le panier est vide");
  document.querySelector("#order").setAttribute("value", "Panier vide!");
}
}

// récupération des données client + du panier final

let contactRef;
let commandeFinale;
function paquet() {
  contactRef = JSON.parse(localStorage.getItem("contactClient"));
  commandeFinale = {
    contact: {
      firstName: contactRef.firstName,
      lastName: contactRef.lastName,
      address: contactRef.address,
      city: contactRef.city,
      email: contactRef.email,
    },
    products: panierId,
  };
}

// fonction récupérant tout ce qui vient d'être trié et stocké + l'envoie au back-end via POST
function envoiPaquet() {
  tableauId();
  paquet();
  console.log(commandeFinale);
  let somme = contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;
  if (panierId.length != 0 && somme === 5) {
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
        window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
      })
      .catch(function (err) {
        console.log(err);
        alert("erreur");
      });
  }
}

// affichage du numéro de la commande + nettoyage du local et session storage


