// Récupération des données Utilisateur de la variable superGlobale sessionStorage
var userId = sessionStorage.userId;
var userToken = sessionStorage.userToken;
var userName = sessionStorage.userName;
var userFirstName = sessionStorage.userFirstName;
// Suppression des données contenues dans la variable superglobale sessionStorage
sessionStorage.clear();
// Début traitement

window.onload = savePatientPage();

function userInfos(){
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userToken", userToken);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userFirstName", userFirstName);
}

function savePatientPage(){
    if(!userId){
        alert("Vous n'êtes pas connecté !");  
        document.getElementById("userInfos").value = "TEST MODE";    
    }
    else {
        //alert(`Bienvenu Monsieur: ${sessionStorage.getItem("userFirstName")+" "+sessionStorage.getItem("userName")}`);
        //ou document.getElementById("userId").value = sessionStorage.userFirstName.toLowerCase()+" "+sessionStorage.userName.toUpperCase();
        document.getElementById("userInfos").value = `${userFirstName.toLowerCase()} ${userName.toUpperCase()}`;
        document.getElementById("userIdsEntered").value = userId;   
    }
}

// function savePatientsPage1(){
//     //alert(`Bienvenu Monsieur: ${sessionStorage.getItem("userFirstName")+" "+sessionStorage.getItem("userName")}`);
//     document.getElementById("userInfos").value = `${sessionStorage.userFirstName.toLowerCase()} ${sessionStorage.userName.toUpperCase()}`;
//     document.getElementById("userIdsEntered").value = sessionStorage.userId;
//     //ou document.getElementById("userId").value = sessionStorage.userFirstName.toLowerCase()+" "+sessionStorage.userName.toUpperCase();
// }

function frontSavePatients(){
    
    // Body Patient
    var patientBody = {
            patientId: document.getElementById("idEntered").value,
            name: document.getElementById("nameEntered").value,
            firstName: document.getElementById("firstNameEntered").value,
            birthDate: document.getElementById("birthDateEntered").value,
            pieceNumber: document.getElementById("pieceNumberEntered").value,
            typeOfPiece: document.getElementById("typeOfPieceEntered").value,
            gender: document.getElementById("genderEntered").value,
            address: document.getElementById("addressEntered").value,
            placeOfResidence: document.getElementById("placeOfResidenceEntered").value,
            phoneNumber: document.getElementById("phoneNumberEntered").value,
            employer: document.getElementById("employerEntered").value,
            electricityRelease: document.getElementById("electricityReleaseEntered").value,
            waterClearance: document.getElementById("waterClearanceEntered").value,
            nationality: document.getElementById("nationalityEntered").value,
            fatherFullName: document.getElementById("fatherFullNameEntered").value,
            motherFullName: document.getElementById("motherFullNameEntered").value,
            convention: document.getElementById("conventionIdEntered").value,
            //imageUrl: document.getElementById("imageUrlEntered").value,
            user: document.getElementById("userIdsEntered").value,
            registrationDate: document.getElementById("registrationDateEntered").value,
            //Date.now(),            
            center: document.getElementById("centerIdsEntered").value
    };
    // Body Centre
    var centerBody = {
        wording: document.getElementById("centerIdsEntered").value,
        patientId: document.getElementById("idEntered").value,
        prestationId: document.getElementById("prestationIdEntered").value
    };
    var centerArray = new Array();
    var prestationArray = new Array();
    var costArray = new Array();
    var conventionWordingArray = new Array();
    var conventionInsuredShareArray = new Array();
    
    //requête 1: Patient
    var request1 = new XMLHttpRequest();
    request1.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201 ) {
            // Vérification de la réussite de la requête
            // alert("Enregistrement de Patient Réussi !");
            //requête 2: Centre
            var request2 = new XMLHttpRequest();
            request2.onreadystatechange = function() {
                if(this.readyState == XMLHttpRequest.DONE && this.status == 201){
                    // Vérification de la réussite de la requête
                    // alert("Enregistrement de prestation effectuée !");
                    // Requête 3
                    var request3 = new XMLHttpRequest();
                    request3.onreadystatechange = function(){
                    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                        // Vérification de la réussite de la requête
                        // alert("Prestations obtenues !");
                        var response3 = JSON.parse(this.responseText);
                        // Requête 4
                        var request4 = new XMLHttpRequest();
                        request4.onreadystatechange = function(){
                            if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                                // Vérification de la réussite de la requête
                                // alert("Conventions obtenues !");
                                var response4 = JSON.parse(this.responseText);
                                // Début traiment
                                for(i=0; i<response3.prestations.length; i++){
                                    if(response3.prestations[i].wording == centerBody.prestationId){
                                        for(j=0; j<response3.prestations[i].centerIds.length; j++){
                                                if(response3.prestations[i].centerIds[j] == centerBody.wording){
                                                    centerArray.push(response3.prestations[i].centerIds[j]);
                                                    prestationArray.push(response3.prestations[i].wording);
                                                    costArray.push(response3.prestations[i].cost[j]);
                                                }
                                        }

                                    }
                                }
                                // for(k=0; k<costArray.length; k++){
                                //     alert(`Prestation: ${prestationArray[k]}\nCoût de la prestation: ${costArray[k]}\nCentre concerné: ${centerArray[k]}`);
                                // }
                                for(i=0; i<response4.conventions.length; i++){
                                    if(response4.conventions[i].wording == patientBody.convention ){
                                        conventionWordingArray.push(response4.conventions[i].wording);
                                        conventionInsuredShareArray.push(response4.conventions[i].insuredShare);
                                    }
                                }
                                for(l=0; l<conventionWordingArray.length; l++){
                                    alert(`Assurance: ${conventionWordingArray[l]}\nRéduction: ${100-conventionInsuredShareArray[l]}%`);
                                }
                                
                            }
                        };
                        request4.open("GET", "http://localhost:3001/api/conventions");
                        request4.setRequestHeader("Authorization", "Bearer "+userToken);
                        request4.send();
                    }
                    };
                    // Envoie de la requête 3
                    request3.open("GET", "http://localhost:3001/api/prestations");
                    request3.setRequestHeader("Authorization", "Bearer "+userToken);
                    request3.send();
                }
            };
            // Envoie de la requête 2
            request2.open("POST","http://localhost:3001/api/centers");
            request2.setRequestHeader("Content-type", "application/json");
            request2.setRequestHeader("Authorization", "Bearer "+userToken);
            request2.send(JSON.stringify(centerBody));
        }
    };

    //Envoie de la requête 1
    request1.open("POST", "http://localhost:3001/api/patients");
    request1.setRequestHeader("Content-type", "application/json");
    request1.setRequestHeader("Authorization", "Bearer "+userToken);
    request1.send(JSON.stringify(patientBody));
};

function redirect(){
    setTimeout( function(){
        if(!userId){
        alert("Veuillez vous connecter svp");
        document.location.href ="./loginPagePropositionParOri.html";
        // document.getElementById("loginForm")[0].value = "";
        // document.getElementById("loginForm")[1].value = "";
        }
        else {
            document.location.href="./savePatientsPage.html";
            };
}, 1000);};

function redirect1(){
    setTimeout( function(){
        if(!userId){
        alert("Veuillez vous connecter svp");
        document.location.href ="./loginPagePropositionParOri.html";
        // document.getElementById("loginForm")[0].value = "";
        // document.getElementById("loginForm")[1].value = "";
        }
        else {
            document.location.href="./handlePatientsPage.html";
            };
}, 1000);};

// function display(){
//     prompt("Le boutton fonctionne bien !")
// }


// window.onload = savePatientsPage1();

document.getElementById("savePatientForm").addEventListener("submit", function(e) {
    e.preventDefault();
    // display();
    frontSavePatients();
    userInfos();
    // redirect();
});
document.getElementById("userInfos").addEventListener("click", function(e) {
    e.preventDefault();
    userInfos();
    redirect1();
});
document.getElementById("userProfilImage").addEventListener("click", function(e) {
    e.preventDefault();
    userInfos();
    redirect1();
});