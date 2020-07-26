/*----->CONSTANTS<-----*/
const NuméroCommande = document.getElementById("NuméroDeCommande"); //bloc où on va insérer l'information
const PrixCommande = document.getElementById("PrixDeCommande"); //bloc où on va insérer l'information
const MessageConfirmation = document.getElementById("MessageDeConfirmation"); //bloc où on va insérer l'information
const historic = document.getElementById("historic"); //bloc où on va insérer l'information
const winLocation = window.location.search;

let CommandeAjoutee = localStorage.getItem("Commandes");
console.log(CommandeAjoutee);
let CommandeAjouteeTableau = JSON.parse(CommandeAjoutee);
console.log(CommandeAjouteeTableau);

let winLocation_ID;
let orderID;
let EmplacementListe;


/*  ExtractionVariableURL   */
function getUrl_Id() {
    const winLocationNuméro = winLocation.split("=");
    winLocation_ID = winLocationNuméro[1]; //on chope le numéro de commande passé dans l'url après le "="
    console.log(winLocation_ID);
    return winLocation_ID;
}

/*    Extraction Commande  -------------------  */
function getCommandes() {
    if (CommandeAjouteeTableau) {
        for (let i = 0; i < CommandeAjouteeTableau.length; i++) {
            if (CommandeAjoutee != null) {
                addHistory(historic, CommandeAjouteeTableau[i].NuméroDeCommande, CommandeAjouteeTableau[i].PrixCommande);
                if (CommandeAjouteeTableau[i].NuméroDeCommande === winLocation_ID) {
                    let orderId = CommandeAjouteeTableau[i].NuméroDeCommande;
                    console.log("Commande n° " + orderId);
                    EmplacementListe = i;
                    return EmplacementListe;
                }
            } else {
                alert("Vous n'avez passé aucune commande");
            }
        }
    } else {
        alert("Vous n'avez passé aucune commande");
    }
}

//Fonction pour l'historique de commandes
/*function addHistory(section, orderID, PrixFacture) {
    //Create Li
    let newTab = document.createElement("li")
    section.appendChild(newTab);
    newTab.className = "list-group-item list-group-item-dark";
    newTab.innerHTML = "Commande n° " + orderID + " pour un total de " + PrixFacture + " €";
}*/

//Fonction pour l'historique de commandes
function addHistory(section, orderID, PrixFacture) {
    const newTr = document.createElement("tr"); 
    section.appendChild(newTr);
        //Ajout td_Commande
        const AjouttdCommande = document.createElement("td");
        newTr.appendChild(AjouttdCommande);
            //Ajout Commande
            const AjoutCommande = document.createElement("p");
            AjouttdCommande.appendChild(AjoutCommande);
            AjoutCommande.innerHTML = "n° " + orderID;
        //Ajout tdPrixCommande
        const AjouttdPrix = document.createElement("td");
        newTr.appendChild(AjouttdPrix);
            //Ajout AjoutPrix
            const AjoutPrix = document.createElement("p");
            AjouttdPrix.appendChild(AjoutPrix);
            AjoutPrix.innerHTML = PrixFacture + " €";
}

//function for get and display orderID and total price
function AfficheCommandeetPrix(orderID, PrixFacture) {
    NuméroCommande.innerHTML = orderID;
    PrixCommande.innerHTML = PrixFacture;
}
//Function to clear basket product local storage
function ViderlePanier() {
    localStorage.removeItem("ProduitsDuPanier");
}
/*----->CALL<-----*/
ViderlePanier(); // On vide le panier pour que l'utilisateur puisse passer à une nouvelle commande
RafraichirLePanier(); //(fonction dans panier.js) on met à jours l'affichge du panier en haut à droite
getUrl_Id(); // on chope le n° de commande dans l'URL pour la comparaison lors de getCommandes
if (winLocation_ID != undefined) {
    getCommandes();
    let orderId = CommandeAjouteeTableau[EmplacementListe].NuméroDeCommande;
    let PrixCommande = CommandeAjouteeTableau[EmplacementListe].PrixCommande;
    AfficheCommandeetPrix(orderId, PrixCommande);
}