let Panier = document.getElementById("panier");

//All buttons 
const buttonSupprimer_Panier = document.getElementById("supprimer_panier");
const buttonAjouter_Panier = document.getElementById("ajouter_panier");

//Display of number of articles
function refreshNumberBasket() {
    let FournitureAjouter_Panier = localStorage.getItem("ProduitsDuPanier");
    let FournitureTableau_Panier = JSON.parse(FournitureAjouter_Panier);
    if (FournitureTableau_Panier) {
        let NombreProduitPanier = FournitureTableau_Panier.length;
        Panier.innerHTML = "Panier (" + NombreProduitPanier + ")";
        console.log(NombreProduitPanier + " produit dans le panier");
    } else {
        Panier.innerHTML = "Panier (0)";
        console.log("Panier vide !");
    }
}

/*----->FUNCTION CALL<-----*/
refreshNumberBasket()