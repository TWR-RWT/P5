/*----->API DEFINITION<-----*/
const api_1 = "http://localhost:3000/api/furniture/order"


/*----->CONSTANTS<-----*/
const ProduitParProduit = document.getElementById("ProduitParProduit"); // 1ère div où on créer notre liste de produits du panier
const PrixPanier = document.getElementById("PrixDuPanier");
const ButtonSupprimerTout = document.getElementById("ButtonSupprimerTout"); // Effacer le rendu du panier de la page
const FormulaireFurnitures = document.getElementById("FormulaireFurnitures"); // Pour mettre le formulaire de validation
const buttonValiderPanier = document.getElementById("buttonValiderPanier");
const buttonValiderCommande = document.getElementById("buttonValiderCommande"); // button confirmation
const body = document.getElementById("body"); // Selection le body pour l'insertion d'élèment en bas de page comme les messages d'alerte
const cadre = document.getElementById("cadre"); // Ajouter le SousTotal, Rendre invisible

const ParagraphePanierRempli = document.getElementById("ParagraphePanierRempli");
const ParagraphePanierVide = document.getElementById("ParagraphePanierVide");
const Jumbotron = document.getElementById("jumbotron");

    /*----->CONSTANTS<-----*/
    const PrenomFormulaire = document.getElementById("PrenomFormulaire");
    const NomFormulaire = document.getElementById("NomFormulaire");
    const AdresseFormulaire = document.getElementById("AdresseFormulaire");
    const VilleFormulaire = document.getElementById("VilleFormulaire");
    const MailFormulaire = document.getElementById("MailFormulaire");
    const PrenomFormulaireDiv = document.getElementById("PrenomFormulaireDiv");
    const NomFormulaireDiv = document.getElementById("NomFormulaireDiv");
    const AdresseFormulaireDiv = document.getElementById("AdresseFormulaireDiv");
    const VilleFormulaireDiv = document.getElementById("VilleFormulaireDiv");
    const MailFormulaireDiv = document.getElementById("MailFormulaireDiv");

//Local storage
let PanierFurnitureAjoutee = localStorage.getItem("ProduitsDuPanier");
let PanierFurnitureTableau = JSON.parse(PanierFurnitureAjoutee);
let AllFurnitureTab = [];
let PrixFacture;

/* Fonction PagePanierVide */
function PagePanierVide(){
    if (PanierFurnitureAjoutee == null){
        ParagraphePanierRempli.classList.add("d-none");
        ParagraphePanierVide.classList.remove("d-none");
        Jumbotron.classList.add("d-none");
    } else {}
}
PagePanierVide()
/*-----Fonctions-----*/
/*  AjouterLeProduit    */
function AjouterLeProduit(section, FurnitureInfo, i) {
    //Create unique div by object for delete button
    const newTr = document.createElement("tr"); 
    section.appendChild(newTr);
    newTr.id = "tr_furniture" + i;
        //AjoutImageImageTitreDescription
        const AjoutImageTitreDescription = document.createElement("td");
        newTr.appendChild(AjoutImageTitreDescription);
            //AjoutFigure
            const AjoutFigure = document.createElement("figure");
            AjoutImageTitreDescription.appendChild(AjoutFigure);
            AjoutFigure.className = "media";
                //AjoutDivImage
                const AjoutDivImage = document.createElement("div");
                AjoutFigure.appendChild(AjoutDivImage);
                AjoutDivImage.className = "img-wrap mx40";
                    //AjoutImage
                    const AjoutImage = document.createElement("img");
                    AjoutDivImage.appendChild(AjoutImage);
                    AjoutImage.setAttribute('src', FurnitureInfo[i].picture);
                    AjoutImage.className = "img-thumbnail";
                //AjoutFigcaption
                const AjoutFigcaption = document.createElement("figcaption");
                AjoutFigure.appendChild(AjoutFigcaption);
                AjoutFigcaption.className = "media-body";
                    //AjoutTitre
                    const AjoutTitre = document.createElement("h6");
                    AjoutFigcaption.appendChild(AjoutTitre);
                    AjoutTitre.className = "title text-truncate pl-3";
                    AjoutTitre.innerHTML = FurnitureInfo[i].name;
                    //AjoutDl
                    const AjoutDl = document.createElement("dl");
                    AjoutFigcaption.appendChild(AjoutDl);
                    AjoutDl.className = "param param-inline small pl-3";
                        //AjoutDt
                        const AjoutDt = document.createElement("dt");
                        AjoutDl.appendChild(AjoutDt);
                        AjoutDt.innerHTML = "Description:";
                        //AjoutDd
                        const AjoutDd = document.createElement("dd");
                        AjoutDl.appendChild(AjoutDd);
                        AjoutDd.innerHTML = FurnitureInfo[i].description;
                    //AjoutDl2
                    const AjoutDl2 = document.createElement("dl");
                    AjoutFigcaption.appendChild(AjoutDl2);
                    AjoutDl2.className = "param param-inline small pl-3";
                        //AjoutDt
                        const AjoutDt2 = document.createElement("dt");
                        AjoutDl2.appendChild(AjoutDt2);
                        AjoutDt2.innerHTML = "Vernis:";
                        //AjoutDd
                        const AjoutDd2 = document.createElement("dd");
                        AjoutDl2.appendChild(AjoutDd2);
                        AjoutDd2.innerHTML = FurnitureInfo[i].option; /*Varnish*/

        //Ajout Quantité
        const AjoutQuantité = document.createElement("td");
        newTr.appendChild(AjoutQuantité);
            //Ajout Nombre
            const AjoutNombre = document.createElement("p");
            AjoutQuantité.appendChild(AjoutNombre);
            AjoutNombre.innerHTML = FurnitureInfo[i].number;
        
        //Ajout Prix
        const AjoutPrix = document.createElement("td");
        newTr.appendChild(AjoutPrix);
            //Ajout DivPrix
            const AjoutDivPrix = document.createElement("div");
            AjoutPrix.appendChild(AjoutDivPrix);
            AjoutDivPrix.className = "price-wrap";
                //Ajout PrixFurniture
                const AjoutPrixFurniture = document.createElement("var");
                AjoutDivPrix.appendChild(AjoutPrixFurniture);
                const Prix = FurnitureInfo[i].price * FurnitureInfo[i].number / 100;
                AjoutPrixFurniture.innerHTML = Prix.toPrecision(4) + " €";
                //Ajout Small
                const AjoutSmall = document.createElement("small");
                AjoutDivPrix.appendChild(AjoutSmall);
                const PrixUnite = FurnitureInfo[i].price / 100;
                AjoutSmall.innerHTML = " (" + PrixUnite + "€ l'unité)";
                AjoutSmall.className = "text-muted";
        
        //Ajout Supprimer
        const AjoutSupprimer = document.createElement("td");
        newTr.appendChild(AjoutSupprimer);
        AjoutSupprimer.className = "text-right";
            //Ajout ButtonSupprimer
/*            const AjoutButtonSupprimer = document.createElement("button");
            AjoutSupprimer.appendChild(AjoutButtonSupprimer);
            AjoutButtonSupprimer.innerHTML = " × Supprimer";
            AjoutButtonSupprimer.id = "ButtonSupprimer" + i;
            AjoutButtonSupprimer.className = "btn btn-outline-danger";
            AjoutButtonSupprimer.type = "button"; */
}
    // Fin AjouterLeProduit //
        // Construction table //
        function ConstructionSousTotal(section){
            const newtable = document.createElement("table"); 
            section.appendChild(newtable);
            newtable.setAttribute("id", "FormulaireFurnitures");
            newtable.className = "table table-hover shopping-cart-wrap visible";
                // Ajout  tbody //
                const newtbody = document.createElement("tbody"); 
                newtable.appendChild(newtbody);
                    // Ajout  tr //
                    const newtr = document.createElement("tr"); 
                    newtbody.appendChild(newtr);
                        // Ajout  td //
                        const newtd = document.createElement("td"); 
                        newtr.appendChild(newtd);
                            // Ajout span //
                            const newspan = document.createElement("span"); 
                            newtd.appendChild(newspan);
                            newspan.setAttribute("id", "NombreProduit");
                            // Ajout small //
                            const newsmall = document.createElement("small"); 
                            newtd.appendChild(newsmall);
                            newsmall.innerHTML = " unité(s)";
                            newsmall.className = "text-muted";
                        // Ajout  td2 //
                        const newtd2 = document.createElement("td"); 
                        newtr.appendChild(newtd2);
                            // Ajout small2 //
                            const newsmall2 = document.createElement("small"); 
                            newtd2.appendChild(newsmall2);
                            newsmall2.innerHTML = "Valeur: ";
                            newsmall2.className = "text-muted";
                            // Ajout span2 //
                            const newspan2 = document.createElement("span"); 
                            newtd2.appendChild(newspan2);
                            newspan2.setAttribute("id", "PrixFurniture");
                        // Ajout  td //
                        const newtd3 = document.createElement("td"); 
                        newtr.appendChild(newtd3);
                            // Ajout small3 //
                            const newsmall3 = document.createElement("small"); 
                            newtd3.appendChild(newsmall3);
                            newsmall3.innerHTML = "Frais de port: ";
                            newsmall3.className = "text-muted";
                            // Ajout span //
                            const newspan3 = document.createElement("span"); 
                            newtd3.appendChild(newspan3);
                            newspan3.setAttribute("id", "FraisDeLivraison");
                        // Ajout  td //
                        const newtd4 = document.createElement("td"); 
                        newtr.appendChild(newtd4);
                            // Ajout small4 //
                            const newsmall4 = document.createElement("small"); 
                            newtd4.appendChild(newsmall4);
                            newsmall4.innerHTML = "Total: ";
                            newsmall4.className = "text-muted";
                            // Ajout span //
                            const newspan4 = document.createElement("span"); 
                            newtd4.appendChild(newspan4);
                            newspan4.setAttribute("id", "MontantFacture");
        }
        // Fin Construction SousTotal //
    // Suppression Produit //
        // Message Suppression Produit //
        function MessageSuppressionPanier(section) {
            let child = document.getElementById("MessageDeSuppressionPanier");
            if (child) {
                //console.log(child);
                let oldChild = section.removeChild(child);
            }
            let TextSuppression = document.createElement("p");
            section.appendChild(TextSuppression);
            TextSuppression.setAttribute("id", "MessageDeSuppressionPanier");
            TextSuppression.className = "MessageValidation alert alert-warning";
            TextSuppression.innerHTML = "Le panier a été supprimé"
        }
        // Fin Message Suppression Produit //
        // Message Si Panier Vide //
        function MessagePanierVide(section) {
            let TextPanierVide = document.createElement("p");
            section.appendChild(TextPanierVide);
            TextPanierVide.className = "MessageValidation alert alert-warning";
            TextPanierVide.innerHTML = "Le panier est vide";
        }
        // Fin Message Si Panier Vide //
    // Fin Suppression Produit //

    // Construction SousTotal //
        // Calcul du Total à Payer //
        function CalculPrixTotal(Nb, PrixSommeProduits) {
            NombreProduit.innerHTML = Nb;
            PrixFurniture.innerHTML = PrixSommeProduits + " €";
            let fraisdeport = 5;
            FraisDeLivraison.innerHTML = fraisdeport + " €";
            PrixFacture = PrixSommeProduits + fraisdeport;
            MontantFacture.innerHTML = PrixFacture + " €";
            //alert(PanierFurnitureTableau[i]);
/*            AllFurnitureTab.push(PanierFurnitureTableau[i].price); /// enlever cette ligne
            //alert(AllFurnitureTab);
            let PrixFinal = 0;
            for (let i = 0; i < PanierFurnitureTableau.length; i++) {
                //AllFurnitureTab.push(PanierFurnitureTableau[i].price); // Ligne à rajouter
                //alert(AllFurnitureTab);
                PrixFinal += AllFurnitureTab[i];
                //alert(PrixFinal);   
            }
            PrixFinal2 = PrixFinal / 100;
            PrixFurniture.innerHTML = PrixFinal2 + " €";
            let fraisdeport = 5;
            FraisDeLivraison.innerHTML = fraisdeport + " €";
            PrixFacture = PrixFinal2 + fraisdeport;
            MontantFacture.innerHTML = PrixFacture + " €"; */
        }
        // Fin Calcul du Total à Payer //

    // Verifications Formulaire //
        // REGEX //
        function VerifText(value) {
            return /^[a-zA-Zéàèç" "]{3,}$/.test(value);
        }
        function VerifAddress(value) {
            return /^[a-zA-Z0-9éèäâùç" "]{3,}$/.test(value);
        }
        function VerifMail(value) {
            return /^[a-zA-Z0-9.:#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/.test(value);
        }
        // Fin REGEX //
                // Ajout Message Erreur //
                function AjoutMessageErreur(section, TextErreur) {
                    let MessageErreur = document.createElement("p");
                    section.appendChild(MessageErreur);
                    MessageErreur.className = "MessageValidation alert alert-danger";
                    MessageErreur.innerHTML = TextErreur;
                    }
                // Fin Ajout Message Erreur //
        // Verif Form //
            // Verif Prénom //
            function VerifPrenom() {
                if (VerifText(PrenomFormulaire.value) === false) {
                    console.log("Nom invalide");
                    PrenomFormulaire.classList.remove("is-valid");
                    PrenomFormulaire.classList.add("is-invalid");
            
                } else {
                    console.log("Nom valide");
                    PrenomFormulaire.classList.remove("is-invalid");
                    PrenomFormulaire.classList.add("is-valid");
                }
            }
            // Fin Verif Prénom //
            // Verif Nom //
            function VerifNom() {
                if (VerifText(NomFormulaire.value) === false) {
                    console.log("Nom invalide");
                    NomFormulaire.classList.remove("is-valid");
                    NomFormulaire.classList.add("is-invalid");
            
                } else {
                    console.log("Nom valide");
                    NomFormulaire.classList.remove("is-invalid");
                    NomFormulaire.classList.add("is-valid");
                }
            }
            // Fin Verif Nom //
            // Verif Adresse //
            function VerifAdresse() {
                if (VerifAddress(AdresseFormulaire.value) === false) {
                    console.log("Adresse invalide");
                    AdresseFormulaire.classList.remove("is-valid");
                    AdresseFormulaire.classList.add("is-invalid");
            
                } else {
                    console.log("Adresse valide");
                    AdresseFormulaire.classList.remove("is-invalid");
                    AdresseFormulaire.classList.add("is-valid");
                }
            }
            // Fin Verif Adresse //
            // Verif Ville //
            function VerifVille() {
                if (VerifText(VilleFormulaire.value) === false) {
                    console.log("Ville invalide");
                    VilleFormulaire.classList.remove("is-valid");
                    VilleFormulaire.classList.add("is-invalid");
            
                } else {
                    console.log("Ville valide");
                    VilleFormulaire.classList.remove("is-invalid");
                    VilleFormulaire.classList.add("is-valid");
                }
            }
            // Fin Verif Ville //
            // Verif Mail //
            function VerifEmail() {
                if (VerifMail(MailFormulaire.value) === false) {
                    console.log("Mail invalide");
                    MailFormulaire.classList.remove("is-valid");
                    MailFormulaire.classList.add("is-invalid");
            
                } else {
                    console.log("Mail valide");
                    MailFormulaire.classList.remove("is-invalid");
                    MailFormulaire.classList.add("is-valid");
                }
            }
            // Fin Verif Mail //
        // Fin Verif Form //
        // Listener //
        PrenomFormulaireDiv.addEventListener("input", function() {
            VerifPrenom();
        });
        NomFormulaireDiv.addEventListener("input", function() {
            VerifNom();
        });
        AdresseFormulaireDiv.addEventListener("input", function() {
            VerifAdresse();
        });
        VilleFormulaireDiv.addEventListener("input", function() {
            VerifVille();
        });
        MailFormulaireDiv.addEventListener("input", function() {
            VerifMail();
        });
    // Fin Listener //
// Fin Verifications Formulaire //





    // Construction ListeProduits //
    function ConstructionListeProduits() {
        let TOTALPrix = 0;
        let TOTALUnite = 0;
        if (PanierFurnitureTableau) {
            for (let i = 0; i < PanierFurnitureTableau.length; i++) {
                TOTALPrix += PanierFurnitureTableau[i].number * PanierFurnitureTableau[i].price / 100;
                TOTALUnite += parseInt(PanierFurnitureTableau[i].number);
            }
            console.log(TOTALPrix);
            console.log(TOTALUnite);
            CalculPrixTotal(TOTALUnite, TOTALPrix);
            for (let i = 0; i < PanierFurnitureTableau.length; i++) {
                if (PanierFurnitureAjoutee != null) {
                    AjouterLeProduit(ProduitParProduit, PanierFurnitureTableau, i);
                    console.log(PanierFurnitureTableau[i]);// Object 
                    console.log(PanierFurnitureTableau[i].number); //quantité de la ligne
                    //CalculPrixTotal(i);
                } else { 
                    MessagePanierVide(body);
                    cadre.add("invisible");
                }
            }
        } else {
            MessagePanierVide(body);
            cadre.add("invisible");
        }
    }
    // Fin Construction ListeProduits //
    // Envoie InfoPageConfirmation //    
        // EnvoiPageConfirmation //
        function EnvoiConfirmationPage(orderID, PrixTotal) {
            let DetailCommande = {
                NuméroDeCommande: orderID,
                PrixCommande: PrixTotal,
            }
            //alert(DetailCommande);
            console.log(DetailCommande);
            //localStorage.removeItem("Commandes");     //pour effacer l'historique de commande dans le localstorage au cas où
            const CommandesAjoutées = localStorage.getItem("Commandes");
            //alert(CommandesAjoutées);
            console.log(CommandesAjoutées);
            if (CommandesAjoutées) {
                TableauCommande = JSON.parse(CommandesAjoutées);
                TableauCommande.push(DetailCommande);
                localStorage.setItem('Commandes', JSON.stringify(TableauCommande));
            } else {
                TableauCommande = [];
                TableauCommande.push(DetailCommande);
                localStorage.setItem('Commandes', JSON.stringify(TableauCommande));
            }
            window.location.href = './confirmation.html?orderId=' + orderID; ///Verif ça
        }
        // Fin EnvoiPageConfirmation //
        // Method Envoi Commandes //
/*        const MethodPost = async(url, packet) => {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(packet),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                return await response.json();
            } else {
                console.log("Erreur lors de l'envoi des données: " + error);
            }
        }   ---------------------------------------------------------------*/
        // Fin Method Envoi Commandes //
    // Fin Envoie InfoPageConfirmation //

//Appels

ConstructionSousTotal(cadre);
const NombreProduit = document.getElementById("NombreProduit"); // Dans le SousTotal
const PrixFurniture = document.getElementById("PrixFurniture"); // Dans le SousTotal
const FraisDeLivraison = document.getElementById("FraisDeLivraison"); // Dans le SousTotal
const MontantFacture = document.getElementById("MontantFacture"); // Dans le SousTotal
ConstructionListeProduits();


// Vider Le Panier //
    // Button SupprimerTout //
    ButtonSupprimerTout.addEventListener('click', function() {
        if (PanierFurnitureTableau) {
            localStorage.removeItem("ProduitsDuPanier")
                while (ProduitParProduit.firstChild) {
                    ProduitParProduit.removeChild(ProduitParProduit.lastChild);
                }
            RafraichirLePanier();
            //MessageSuppressionPanier(body); // Recharge directement après la page donc ne sert à rien
            //FormulaireFurnitures.classList.remove("visible");
            //FormulaireFurnitures.classList.add("invisible");
            //ButtonSupprimerTout.classList.add("invisible");  
            document.location.reload(true);  
        }
    })
    // Fin Button SupprimerTout //
// Fin Vider Le Panier //




// Validation et apparition Panier //
    // ButtonValiderPanier //  /* On ne l'utilise pas pour le moment */ 
 /*   buttonValiderPanier.addEventListener('click', function() {
        FormulaireFurnitures.classList.remove("invisible");
        FormulaireFurnitures.classList.add("visible");
        FormulaireFurnitures.scrollIntoView();
    })   */
    // Fin ButtonValiderPanier //
// Fin Validation et apparition Panier //

// Nouveau ---------------------------------------------------------------
function stringifyPost() {
    let Firstname = document.querySelector('#PrenomFormulaire').value;
    console.log(typeof Firstname); // C'est bien en format string
    let Lastname = document.querySelector('#NomFormulaire').value;
    console.log(typeof Lastname); // C'est bien en format string
    let Address = document.querySelector('#AdresseFormulaire').value;
    console.log(typeof Address); // C'est bien en format string
    let City = document.querySelector('#VilleFormulaire').value;
    console.log(typeof City); // C'est bien en format string
    let Email = document.querySelector('#MailFormulaire').value;
    console.log(typeof Email); // C'est bien en format string
    let contact = {
        firstName: Firstname,
        lastName: Lastname,
        address: Address,
        city: City,
        email: Email
    }
    console.log(typeof contact); // C'est bien en format string
    let products = []
    for (let i = 0; i < PanierFurnitureTableau.length; i++) {
        products.push(PanierFurnitureTableau[i].ID);
        console.log(typeof PanierFurnitureTableau[i].ID); // C'est bien en format string
    }
    console.log(typeof products); // C'est bien un object array
    //alert(Array.isArray(products)); // array true
    return JSON.stringify({contact, products});
}

/*
function fetchResponse(){
    const response = fetch('http://localhost:3000/api/furniture/order', {
        method: 'POST',
        mode: 'cors',
        body: stringifyPost(),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.ok) {
        return response.json();
    } else {
        console.log("Erreur lors de l'envoi des données")
    }
}
*/
/*
buttonValiderCommande.addEventListener('click', function(e){
    e.preventDefault()
    const RESPONSE = fetchResponse();
    console.log(RESPONSE)
    console.log(RESPONSE.orderId)
    alert(RESPONSE.orderId)
})*/


buttonValiderCommande.addEventListener('click', function(e){
    e.preventDefault()
    if ((PrenomFormulaire.value === '' || NomFormulaire.value === '' || AdresseFormulaire.value === '' || VilleFormulaire.value === '' || MailFormulaire.value === '')) {
        //alert("Formulaire incomplet");
        AjoutMessageErreur(body, "Formulaire incomplet");
    } else if (VerifText(PrenomFormulaire.value) === false || VerifText(NomFormulaire.value) === false || VerifAddress(AdresseFormulaire.value) === false || VerifText(VilleFormulaire.value) === false || VerifMail(MailFormulaire.value) === false) {
        //alert("Formulaire incorrect");
        AjoutMessageErreur(body, "Formulaire incorrect");
    } else {
    fetch('http://localhost:3000/api/furniture/order', {
        method: 'POST',
        mode: 'cors',
        body: stringifyPost(),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(function(response){
        response.json().then(function(data) {
            EnvoiConfirmationPage(data.orderId, PrixFacture);
        })
 /*       const retour = JSON.parse(response)
        alert(retour)
        console.log(retour)
        alert(retour.orderId)
        EnvoiConfirmationPage(retour.orderId, PrixFacture);*/
    }).catch(console.log('fetch error'))
}})

// Fin Nouveau -----------------------------------------------------------

// Listener FinalisationCommande //
/*buttonValiderCommande.addEventListener('click', async(event) => {
    if ((PrenomFormulaire.value === '' || NomFormulaire.value === '' || AdresseFormulaire.value === '' || VilleFormulaire.value === '' || MailFormulaire.value === '')) {
        alert("Formulaire incomplet");
        AjoutMessageErreur(body, "Formulaire incomplet");
    } else if (VerifText(PrenomFormulaire.value) === false || VerifText(NomFormulaire.value) === false || VerifAddress(AdresseFormulaire.value) === false || VerifText(VilleFormulaire.value) === false || VerifMail(MailFormulaire.value) === false) {
        alert("Formulaire incorrect");
    } else if (PanierFurnitureTableau.length === 0) {
        alert("Votre panier est vide");
    } else {
        let products = [];
        for (let i = 0; i < PanierFurnitureTableau.length; i++) {
            products.push(PanierFurnitureTableau[i].ID);
            console.log(typeof PanierFurnitureTableau[i].ID); // C'est bien en format string
        }
        console.log(typeof products); // Bien un array
        alert(products);
        // Enregistrement données clients //
        let contact = {
            firstName: PrenomFormulaire.value,
            lastName: NomFormulaire.value,
            address: AdresseFormulaire.value,
            city: VilleFormulaire.value,
            email: MailFormulaire.value
        }
        console.log(typeof PrenomFormulaire.value); // bien un string
        console.log(typeof NomFormulaire.value); // bien un string
        console.log(typeof AdresseFormulaire.value); // bien un string
        console.log(typeof VilleFormulaire.value); // bien un string
        console.log(typeof MailFormulaire.value); // bien un string
        console.log(contact); // bien un object
        // Fin Enregistrement données clients //
        let PacketEnvoye = { contact, products };
        console.log(PacketEnvoye); //PacketEnvoye validé
        const response = await MethodPost("http://localhost:3000/api/furniture/order", PacketEnvoye); //Problème avec la methode
        alert("MethodPost passée")
        if (response) {
            EnvoiConfirmationPage(response.orderId, PrixFacture);
        }
    }
})*/
// Fin Listener FinalisationCommande //