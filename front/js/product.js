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