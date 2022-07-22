

//Etape 1

fetch( 'http://localhost:3000/api/products') .then((res) => {return res.json()}) .then((data)=>console.log(data));


for (let _id of 'name') {console.log(_id)};

document.getElementById('items');

items.prepend('_id');

let listeKanap = [];

document.getElementById('items').innerHTML= listeKanap.map((kanapes)=>
`<div id="produit$(kanapes._id)" class= "card, card-size">
<h3 class="titre-card">$(kanapes.name.toUpperCase)
</h3>
<img class="image-size" src="$(kanapes.imageUrl)" alt="image du meuble $(kanapes.name)"/>
 <p class="description-meuble"> $(kanapes.description)</p>
 <button id="$(kanapes.id)" class="bouton-details"></button>
 <p>$(kanapes.price.toString().replace(/0+$/,"")) Euro</p>
 </div>`
 );





