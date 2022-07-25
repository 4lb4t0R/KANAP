

/*Etape 3   Insérer les produits dans la page d’accueil*/

fetch("http://localhost:3000/api/products")
 
  .then((res) => res.json())
  
  .then((objetProduits) => {
    
    console.table(objetProduits);
    
    affichageProduits(objetProduits);
  })
  
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
  });

function affichageProduits(index) {
  
  let zoneArticle = document.querySelector("#items");
 
  for (let article of index) {
    
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}
    
 /*Etape 4   Faire le lien entre un produit de la page
d’accueil et la page Produit*/





