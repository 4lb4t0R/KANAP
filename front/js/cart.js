//SECU AFFICHAGE
const page = document.location.href;

// RECUP PRODUITS
if (page.match("cart")) {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((objetProduits) => {
          console.log(objetProduits);
          // appel de la fonction affichagePanier
          affichagePanier(objetProduits);
      })
      .catch((err) => {
          document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
          console.log("erreur 404, sur ressource api: " + err);
      });
    } else {
      console.log("sur page confirmation");
    }
    
    // CONDITIONS AFFICHAGE PANIER
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
    
    //AFFICHAGE PANIER
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
    
    //MODIFS DYNAMIQUES
    
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

    //SUPPRESSION DYNAMIQUE
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

    // FONCTION DES TOTALITES
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
    
    //INFOS IENCLI
    if (page.match("cart")) {
      var contactClient = {};
      localStorage.contactClient = JSON.stringify(contactClient);
      
      var prenom = document.querySelector("#firstName");
      prenom.classList.add("regex_texte");
      var nom = document.querySelector("#lastName");
      nom.classList.add("regex_texte");
      var ville = document.querySelector("#city");
      ville.classList.add("regex_texte");
      
      var adresse = document.querySelector("#address");
      adresse.classList.add("regex_adresse");
      
      var email = document.querySelector("#email");
      email.classList.add("regex_email");
      
      var regexTexte = document.querySelectorAll(".regex_texte");
       
      document.querySelector("#email").setAttribute("type", "text");
    }
    
    //REGEX 
    let regexChiffreLettre = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
    let regValideEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
    let regMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;
    
    //REGEX OK > ATTRIBUTION POINT
    if (page.match("cart")) {
      regexTexte.forEach((regexTexte) =>
        regexTexte.addEventListener("input", (e) => {
          
          valeur = e.target.value;
          
          let regNormal = valeur.search(regexLettre);
          if (regNormal === 0) {
            contactClient.firstName = prenom.value;
            contactClient.lastName = nom.value;
            contactClient.city = ville.value;
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
          couleurRegex(regNormal, valeur, regexTexte);
          valideClic();
        })
      );
    }
    
    //REACTION REGEX
    texteInfo(regexLettre, "#firstNameErrorMsg", prenom);
    texteInfo(regexLettre, "#lastNameErrorMsg", nom);
    texteInfo(regexLettre, "#cityErrorMsg", ville);


   //SECURITE CLIC ET REGEX COMME REGEX > OK
    if (page.match("cart")) {
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
        valideClic();
      });
    }
    
    texteInfo(regexChiffreLettre, "#addressErrorMsg", adresse);
    
    //SECURITE CLIC ET REGEX COMME REGEX > OK
    if (page.match("cart")) {
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
        valideClic();
      });
    }

//TXT SOUS MAIL
if (page.match("cart")) {
    email.addEventListener("input", (e) => {
      
      valeur = e.target.value;
      let regMatch = valeur.match(regMatchEmail);
      let regValide = valeur.search(regValideEmail);
     
      if (valeur === "" && regMatch === null) {
        document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner votre email.";
        document.querySelector("#emailErrorMsg").style.color = "white";
        
      } else if ( regValide !== 0) {
        document.querySelector("#emailErrorMsg").innerHTML = "Caractère non valide";
        document.querySelector("#emailErrorMsg").style.color = "white";
        
      } else if (valeur != "" && regMatch == null) {
        document.querySelector("#emailErrorMsg").innerHTML = "Caratères acceptés pour ce champ. Forme email pas encore conforme";
        document.querySelector("#emailErrorMsg").style.color = "white";
      } else {
        document.querySelector("#emailErrorMsg").innerHTML = "Forme email conforme.";
        document.querySelector("#emailErrorMsg").style.color = "white";
      }
    });
  }