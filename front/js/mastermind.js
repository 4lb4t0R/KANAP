
/*
 *  récupération des données sur produits vendus, depuis l'API de l'entreprise
*/

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


/*
* fonction affichant les produits via des balises insérées dans le HTML
*/

function affichageProduits(index) {
  let zoneArticle = document.querySelector("#items");
  let html = "";

  for (let article of index) {
    html += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }

  zoneArticle.innerHTML = html;
}
    






