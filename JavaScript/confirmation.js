/*----->CONSTANTS<-----*/
const NuméroCommande = document.getElementById("NuméroDeCommande");
const PrixCommande = document.getElementById("PrixDeCommande");
const MessageConfirmation = document.getElementById("MessageDeConfirmation");
const winLocation = window.location.search;

let CommandeAjoutée = localStorage.getItem("Commandes");
alert(CommandeAjoutée);
let CommandeAjoutéeTableau = JSON.parse(CommandeAjoutée);
alert(CommandeAjoutéeTableau);

let winLocation_ID;
let orderID;
let numberArray;


/*  ExtractionVariableURL   */
function getUrl_Id() {
    const winLocationNuméro = winLocation.split("=");
    winLocation_ID = winLocationNuméro[1];
    return winLocation_ID;
}

/*    Extraction Commande    */
/*function getOrders() {
    if (CommandeAjoutéeTableau) {
        for (let i = 0; i < orderAddedArray.length; i++) {
            if (CommandeAjoutée != null) {
                addHistory(historic, orderAddedArray[i].confirmationNumber, orderAddedArray[i].totalPrice);
                if (orderAddedArray[i].confirmationNumber === winLocation_ID) {
                    let orderId = orderAddedArray[i].confirmationNumber;
                    console.log(" numéro de la commande effectuée " + orderId);
                    numberArray = i;
                    return numberArray;
                }
            } else {
                alert("Vous n'avez passé aucune commande");
            }
        }
    } else {
        alert("Vous n'avez passé aucune commande");
    }
}*/