

function () {
    let url = 'http://localhost:3000/api/products';
    fetch(url).then ((response) => response.json().then((data) => {console.log(data);
    let affichage ='<div>';
    for (let produit of data) {
    affichage += 
    '<h3 class="titre-card">$(produit.nom)</h3>'
     '<img class="image-size" src="$(produit.imageUrl)" alt="image du meuble $(produit.name)"/>'
    '<p class="description-meuble"> $(produit.description)</p>'
    '<button id="$(produit.id)" class="bouton-details"></button>'
    '<p>$(produit.price.toString().replace(/0+$/,""))Euro</p>';}
    affichage += '</div>';
    document.querySelector('#items').innerHTML= affichage;})
    );
    };
   