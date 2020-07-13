/*----->API DEFINITION<-----*/
const api_1 = "http://localhost:3000/api/furniture/"

/*----->CONSTANTS<-----*/
const winLocation = window.location.search;
let winLocation_ID;
let Validator = document.getElementById("Validateur");
let ProduitHeader = document.getElementById("ProduitHeader");
let leftBlock = document.getElementById("left_bloc");
let rightBlock = document.getElementById("right_bloc");
//let Description = document.getElementById("DescriptionDuProduit");
let optionList = document.getElementById("options_list");
let productPrice = document.getElementById("product_price");
let NombreProduits = document.getElementById("input_number_product");
let ProduitsDuPanier = [];
const buttonAjouterPanier = document.getElementById("button_Ajout_Panier");
const buttonAjouterDiv = document.getElementById("button_Ajout_Div");

/*------>FUNCTIONS<------*/

//Function getUrl_Id
function getUrl_Id() {
    const winLocation_ID_array = winLocation.split("="); //Split the location.search
    winLocation_ID = winLocation_ID_array[1]; //Get the part after "="
    return winLocation_ID;
}
//Function AjoutImage
function AjoutImage(section, ImageProduit) {
    const newPicture = document.createElement("img");
    section.appendChild(newPicture);
    newPicture.setAttribute('src', ImageProduit);
    newPicture.className = "img-fluid" /*Verif class*/
}
//Function AjoutNom
function AjoutNom(section, NomProduit) {
    const newName = document.createElement("h1");
    section.appendChild(newName);
    newName.innerHTML = NomProduit;
    newName.className = "text-center"; /*Ajouter perso class*/
}
//Function AjoutDescription
function AjoutDescription(section, DescriptionText) {
    const DescriptionProduit = document.createElement("p");
    section.appendChild(DescriptionProduit);
    DescriptionProduit.innerHTML = DescriptionText;
    DescriptionProduit.className = "text-center";
}
//Function AjoutDescription
/*function AjoutDescription(Description) {
    DescriptionProduit.innerHTML = Description;
    DescriptionProduit.className = "text-left";
} */

//Function AjoutOptions
function AjoutOptions(ulName, AjoutOption) {
    for (let i = 0; i < AjoutOption.length; i++) {
        const newOption = document.createElement('option');
        ulName.appendChild(newOption);
        newOption.innerHTML = AjoutOption[i];
        newOption.className = "" /*Ajout class perso class*/
        newOption.id = "option_" + i;
    }
}
//function AjoutPrix
function AjoutPrix(section, FourniturePrice) {
    const newPrice = document.createElement("p");
    section.appendChild(newPrice);
    FourniturePrice_format = FourniturePrice / 100
    newPrice.innerHTML = FourniturePrice_format.toPrecision(4) + " € l'unité";
}
//Function MessageConfirmationPanier
function MessageConfirmationPanier(section, basketValue, value, name) {
    let child = document.getElementById("Message");
    if (child) {
        section.removeChild(child);
    }
    let AjoutText = document.createElement("p");
    section.appendChild(AjoutText);
    AjoutText.setAttribute("id", "Message");
    AjoutText.className = "text-center alert-success MessageValidation mr-2";
    if (basketValue != 1) {
        AjoutText.innerHTML = value + " " + name + " ajoutés au panier ! "
    } else {
        AjoutText.innerHTML = value + " " + name + " ajouté au panier ! "
    }
}

//Function ErreurQuantite
function ErreurQuantite(section) {
    let child = document.getElementById("Message");
    if (child) { 
        section.removeChild(child);
    }
    let AjoutTextErreur = document.createElement("p");
    section.appendChild(AjoutTextErreur);
    AjoutTextErreur.setAttribute("id", "Message");
    AjoutTextErreur.className = "text-center alert-danger MessageValidation mr-2";
    AjoutTextErreur.innerHTML = "Quantité indiquée invalide"
}

/*----->REQUEST>-----*/
function getAllFurniture() {
    fetch(api_1 + winLocation_ID)
        .then(function(response) {
            if (response.ok) {
                //Fonction de réponse
                return response.json() // Retourne la réponse en format JSON quand terminé
            }
        })
        .then(function(data) {
            //left block
                // AjoutImage
            AjoutImage(leftBlock, data.imageUrl);
                // AjoutNom
            AjoutNom(ProduitHeader, data.name);
            //Right bloc
                //AjoutDescription
            AjoutDescription(ProduitHeader, data.description);
                //AjoutOptions
            AjoutOptions(optionList, data.varnish);
                //AjoutPrix
            AjoutPrix(productPrice, data.price);

            /*----->EVENT<-----*/

            //function buttonAjouterPanier on click
            buttonAjouterPanier.addEventListener('click', function() {
                if (NombreProduits.value <= 0) {
                    ErreurQuantite(Validator);
                } else {
                    let AjoutFurniture = {
                        ID: data._id,
                        picture: data.imageUrl,
                        name: data.name,
                        option: optionList.value,
                        price: data.price,
                        description: data.description,
                        number: NombreProduits.value,
                    }
                    const FurnitureAjoutée = localStorage.getItem("ProduitsDuPanier")
                    if (FurnitureAjoutée) {
                        FurnitureTab = JSON.parse(FurnitureAjoutée);
                        FurnitureTab.push(AjoutFurniture);
                        localStorage.setItem('ProduitsDuPanier', JSON.stringify(FurnitureTab));
                        MessageConfirmationPanier(Validator, NombreProduits.value, NombreProduits.value, data.name)
                    } else {
                        FurnitureTab = [];
                        FurnitureTab.push(AjoutFurniture);
                        localStorage.setItem('ProduitsDuPanier', JSON.stringify(FurnitureTab));
                        MessageConfirmationPanier(Validator, NombreProduits.value, NombreProduits.value, data.name)
                    }
                    refreshNumberBasket();
                }
            });
        })
        .catch(function(error) {
            console.log("Erreur lors de l'appel de la fonction" + error);
        })
}

/*----->Appel de la fonction<-----*/
getUrl_Id();
getAllFurniture();