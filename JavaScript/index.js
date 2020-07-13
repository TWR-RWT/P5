/*----->API DEFINITION<-----*/
const api_1 = "http://localhost:3000/api/furniture"

/*----->CONSTANTS<-----*/

const produits = document.getElementById("produits")

/*------>FUNCTION<------*/
/*------>Création contenu cards<------*/
//Function Add Name, price, picture...
function addProductCard(section, FurniturePicture, FurnitureName, FurniturePrice, Furniture_id) {
    //Add Section Col
    const newSection = document.createElement("section");
    section.appendChild(newSection);
    newSection.className = "col-sm-6 col-md-4 mb-2"; /*modif la class*/
    //Add section Card
    const newSection_1 = document.createElement("section");
    newSection.appendChild(newSection_1);
    newSection_1.className = "catalogue__section__card card h-100 bg-light border-secondary"; /*modif la class*/

    //New div card-header
    const newCardHeader = document.createElement("div");
    newSection_1.appendChild(newCardHeader);
    newCardHeader.className = "catalogue__section__card__text card-header text-center"; /*modif la class*/
    //Add Name
    const newName = document.createElement("h3");
    newCardHeader.appendChild(newName);
    newName.innerHTML = FurnitureName;
    newName.className = "catalogue__section__card__text__name product_name"; /*modif la class*/

    //New div card-body
    const newDiv = document.createElement("div");
    newSection_1.appendChild(newDiv);
    newDiv.className = "card-body"; /*modif la class*/
    //Add price
    const newPrice = document.createElement("p");
    newDiv.appendChild(newPrice);
    FurniturePrice_format = FurniturePrice / 100
    newPrice.innerHTML = FurniturePrice_format.toPrecision(4) + " € l'unité";
    newPrice.className = "catalogue__section__card__text__price "; /*modif la class*/

    //Add picture
    const newPicture = document.createElement("img");
    newSection_1.appendChild(newPicture);
    newPicture.setAttribute('src', FurniturePicture);
    newPicture.className = "catalogue__section__card__img card-img-bottom" /*modif la class*/

    //New div card-footer
    const newCardFooter = document.createElement("div");
    newSection_1.appendChild(newCardFooter);
    newCardFooter.className = "catalogue__section__card__text card-footer text-center";
    //Add button
    const newButton = document.createElement("a");
    newCardFooter.appendChild(newButton);
    newButton.innerHTML = "Voir le produit";
    newButton.setAttribute('href', './produit.html?id=' + Furniture_id); /*connexion à la page produit pas encore créée*/
    newButton.className = "catalogue__section__card__btn btn btn-info"; /*modif la class*/
    newButton.setAttribute("type", "button");
    console.log(Furniture_id); /*pas nécessaire*/

}
/*----->REQUEST>-----*/
function getAllFurniture() {
    fetch(api_1) //Requete de l'API
        .then(function(response) {
            if (response.ok) {
                console.log("Récupération des données de l'API OK");
                //Fonction de réponse
                return response.json() // Retourne la réponse en format JSON quand terminé
            }
        })
        .then(function(data) { //réponse de reponse.json est l'argument
            console.log(data)
                //Section Add
            for (let i = 0; i < data.length; i++) {
                console.log(i)
                    //Add Product card
                addProductCard(produits, data[i].imageUrl, data[i].name, data[i].price, data[i]._id);
            }
        })
        .catch(function(error) {
            console.log("Erreur lors de l'appel de la fonction" + error);
        })
}

/*----->Appel de la fonction<-----*/
getAllFurniture()