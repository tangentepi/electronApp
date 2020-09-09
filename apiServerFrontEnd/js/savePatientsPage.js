// Récupération des données Utilisateur de la variable superGlobale sessionStorage
var userId = sessionStorage.userId;
var userToken = sessionStorage.userToken;
var userName = sessionStorage.userName;
var userFirstName = sessionStorage.userFirstName;
var userPhoneNumber = sessionStorage.userPhoneNumber;
var userPhotoUrl = sessionStorage.userPhotoUrl;

// Début traitement

window.onload = savePatientPage();

function randomString(stringLength){
    var stringList = new Array("a", "b", "c", "d", "d", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w" ,"x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    var str = '';
    for(i=0; i<stringLength; i++){
        str = str + stringList[Math.floor(Math.random()*stringList.length)];
    }
    return str;
}

function userInfos(){
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userToken", userToken);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userFirstName", userFirstName);
    sessionStorage.setItem("userPhoneNumber", userPhoneNumber);
    sessionStorage.setItem("userPhotoUrl", userPhotoUrl);
}

function savePatientPage(){
    if(!userId || userId == undefined){
        alert("Vous n'êtes pas connecté !");  
        document.getElementById("userInfos").value = "TEST MODE"; 
    }
    else {
        //alert(`Bienvenu Monsieur: ${sessionStorage.getItem("userFirstName")+" "+sessionStorage.getItem("userName")}`);
        //ou document.getElementById("userId").value = sessionStorage.userFirstName.toLowerCase()+" "+sessionStorage.userName.toUpperCase();
        document.getElementById("userInfos").value = `${userFirstName.toLowerCase()} ${userName.toUpperCase()}`;
        document.getElementById("userIdsEntered").value = userId;   
        document.getElementById("idEntered").value = 'P'+randomString(9).toLocaleUpperCase();
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
    // Body Center
    var centerBody = {
        wording: document.getElementById("centerIdsEntered").value,
        patientId: document.getElementById("idEntered").value,
        registrationDate: document.getElementById("registrationDateEntered").value,
        prestationId: document.getElementById("prestationIdEntered").value
    };
    var registredPatient = {
        patientId: document.getElementById("idEntered").value
    };
    var centerArray = new Array();
    var prestationArray = new Array();
    var costArray = new Array();
    var conventionWordingArray = new Array();
    var conventionInsuredShareArray = new Array();
    
    //requête 1: Patient
    var request1 = new XMLHttpRequest();
    request1.onreadystatechange =  function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201 ) {
            // Vérification de la réussite de la requête
            // alert("Enregistrement de Patient Réussi !");
            //requête 2: Centre
            var request2 = new XMLHttpRequest();
            request2.onreadystatechange =  function() {
                if(this.readyState == XMLHttpRequest.DONE && this.status == 201){
                    // Vérification de la réussite de la requête
                    // alert("Enregistrement de prestation dans le centre effectuée !");
                    // Requête 3
                    var request3 = new XMLHttpRequest();

                    request3.onreadystatechange =  function(){
                        if(this.readyState == XMLHttpRequest.DONE && this.status == 201){
                        // Vérification de la réussite de la requête
                        // alert("Enregistrement de l'identifiant du Patient dans le document user effectuée !");
                        var response3 =  JSON.parse(this.responseText);
                            // Requête 4
                            var request4 = new XMLHttpRequest();
                            request4.onreadystatechange =  function(){
                            if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                            // Vérification de la réussite de la requête
                            // alert("Prestations obtenues !");
                            var response4 =  JSON.parse(this.responseText);
                            // Requête 5
                            var request5 = new XMLHttpRequest();
                            request5.onreadystatechange =  function(){
                                if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                                // Vérification de la réussite de la requête
                                // alert("Conventions obtenues !");
                                var response5 =  JSON.parse(this.responseText);
                                // Début traiment
                                for(i=0; i<response4.prestations.length; i++){
                                    if(response4.prestations[i].wording == centerBody.prestationId){
                                        for(j=0; j<response4.prestations[i].centerIds.length; j++){
                                                if(response4.prestations[i].centerIds[j] == centerBody.wording){
                                                    centerArray.push(response4.prestations[i].centerIds[j]);
                                                    prestationArray.push(response4.prestations[i].wording);
                                                    costArray.push(response4.prestations[i].cost[j]);
                                                }
                                        }

                                    }
                                }
                                // for(k=0; k<costArray.length; k++){
                                //     alert(`Prestation: ${prestationArray[k]}\nCoût de la prestation: ${costArray[k]}\nCentre concerné: ${centerArray[k]}`);
                                // }
                                for(i=0; i<response5.conventions.length; i++){
                                    if(response5.conventions[i].wording == patientBody.convention ){
                                        conventionWordingArray.push(response5.conventions[i].wording);
                                        conventionInsuredShareArray.push(response5.conventions[i].insuredShare);
                                    }
                                }
                                // for(l=0; l<conventionWordingArray.length; l++){
                                //     alert(`Assurance: ${conventionWordingArray[l]}\nRéduction: ${100-conventionInsuredShareArray[l]}%`);
                                // }

                                //Suppression des données contenues dans la variable superglobale sessionStorage avant de commencer à y enregistrer des données
                                sessionStorage.clear();

                                for(i=0; i<costArray.length; i++){
                                    // alert(`Assurance: ${conventionWordingArray[i]}\nRéduction: ${100-conventionInsuredShareArray[i]}%`);
                                    // alert(`Prestation: ${prestationArray[i]}\nCoût de la prestation: ${costArray[i]}\nCentre concerné: ${centerArray[i]}`);

                                    sessionStorage.setItem(`conventionWording${i}`, conventionWordingArray[i]);
                                    sessionStorage.setItem(`reduction${i}`, 100-conventionInsuredShareArray[i]);
                                    sessionStorage.setItem(`prestation${i}`, prestationArray[i]);
                                    sessionStorage.setItem(`prestationCost${i}`, costArray[i]);
                                }

                                sessionStorage.setItem("center", centerBody.wording);
                                sessionStorage.setItem("patientName", patientBody.name);
                                sessionStorage.setItem("patientFirstName", patientBody.firstName);
                                sessionStorage.setItem("patientAddress", patientBody.address);
                                sessionStorage.removeItem("dataLength");
                                sessionStorage.setItem("dataLength", prestationArray.length);

                                // for(i=0; i<sessionStorage.dataLength; i++){
                                //     alert(`Patient: ${sessionStorage.patientFirstName} ${sessionStorage.patientName} \nCentre: ${sessionStorage.center} \nAdresse: ${sessionStorage.patientAddress} \nPrestation: ${sessionStorage.getItem(`prestation${i}`)}\nPrix: ${sessionStorage.getItem(`prestationCost${i}`)}\n Assurance Maladie: ${sessionStorage.getItem(`conventionWording${i}`)} \nRéduction :${sessionStorage.getItem(`reduction${i}`)}`);
                                // }
                                
                                
                            }
                        };
                        // Envoie de la requête 5
                        request5.open("GET", "http://localhost:3001/api/conventions", false);
                        request5.setRequestHeader("Authorization", "Bearer "+userToken);
                        request5.send();
                    }
                    };
                    // Envoie de la requête 4
                    request4.open("GET", "http://localhost:3001/api/prestations", false);
                    request4.setRequestHeader("Authorization", "Bearer "+userToken);
                    request4.send();
                        }
                    };
                    // Envoie de la requête 3

                    request3.open("PUT", `http://localhost:3001/api/users/modify/2/${userId}`, false);
                    request3.setRequestHeader("Content-type","Application/json");
                    request3.setRequestHeader("Authorization", "Bearer "+ userToken);
                    request3.send(JSON.stringify(registredPatient));
                }
            };
            // Envoie de la requête 2
            request2.open("POST","http://localhost:3001/api/centers", false);
            request2.setRequestHeader("Content-type", "application/json");
            request2.setRequestHeader("Authorization", "Bearer "+userToken);
            request2.send(JSON.stringify(centerBody));
        }
    };

    //Envoie de la requête 1
    request1.open("POST", "http://localhost:3001/api/patients", false);
    request1.setRequestHeader("Content-type", "application/json");
    request1.setRequestHeader("Authorization", "Bearer "+userToken);
    request1.send(JSON.stringify(patientBody));
};

function redirection(){
    setTimeout( function(){
        if(sessionStorage.userId && sessionStorage.userPhoneNumber && sessionStorage.dataLength){
            document.location.href="./invoice.html";
        // document.getElementById("loginForm")[0].value = "";
        // document.getElementById("loginForm")[1].value = "";        
        }
}, 1000
);}

function redirection1(){
        setTimeout( function(){
            if(sessionStorage.userId && sessionStorage.userPhoneNumber){
                document.location.href="./handlePatientsPage.html";       
            }
            else {
                alert("Veuillez vous connecter svp !");
                document.location.href ="./loginPagePropositionParOri.html";
                };
    }, 1000
    );
}
function centersAndPrestationsList(){
    var centerSelected = document.getElementById("centerIdsEntered").value;
    prestationsList(centerSelected);
}
function prestationsList(center){
    switch(center){
        case "PÉDIATRIE":
            document.getElementById("prestationsList").innerHTML='<option value="CONSULTATION"><option value="URGENCES"><option value="MISE EN OBSERVATION"><option value="HOSPITALISATIONS">';
        break;
        case "URGENCES ET SALLE D’ACCOUCHEMENT":
            document.getElementById("prestationsList").innerHTML='<option value="ACCOUCHEMENTS"><option value="URGENCES"><option value="MISE EN OBSERVATION">';
        break;
        case "DIABÉTOLOGIE":
            document.getElementById("prestationsList").innerHTML= '<option value="CONSULTATIONS"><option value="MISE EN OBSERVATION">';
        break;
        case "ENDOSCOPIE":
            document.getElementById("prestationsList").innerHTML= '<option value="EXAMENS SPÉCIAUX">';
        break;
        case "DERMATOLOGIE":
                        document.getElementById("prestationsList").innerHTML= '<option value="CONSULTATIONS"><option value="MISE EN OBSERVATION"><option value="HOSPITALISATIONS"><option value="INTERVENTIONS"><option value="EXAMENS SPÉCIAUX"><option value="PANSEMENTS">';
        break;
        case "MALADIES INFECTIEUSES ET TROPICALES (SMIT)":
                        document.getElementById("prestationsList").innerHTML= '<option value="CONSULTATIONS"><option value="MISE EN OBSERVATION"><option value="HOSPITALISATIONS"><option value="RÉANIMATION"><option value="EXAMENS SPÉCIAUX">';
        break;
        case "PNEUMO-PHTISIOLOGIE (PPH)":
                        document.getElementById("prestationsList").innerHTML= '<option value="CONSULTATIONS"><option value="MISE EN OBSERVATION"><option value="HOSPITALISATIONS"><option value="EXAMENS SPÉCIAUX">';
        break;
        case "PSYCHIATRIE":
                        document.getElementById("prestationsList").innerHTML= '<option value="CONSULTATIONS"><option value="MISE EN OBSERVATION">';
                        //  new Option("HOSPITALISATIONS","HOSPITALISATIONS");
        break;
        case "CABINET DENTAIRE":
                        document.getElementById("prestationsList").innerHTML= '<option value="CONSULTATIONS"><option value="EXTRACTION"><option value="SOINS"><option value="EXAMENS SPÉCIAUX"><option value="EXAMENS RADIO">';
                        //  new Option("HOSPITALISATIONS","HOSPITALISATIONS");
        break;
        case "CHIRURGIE GÉNÉRALE, DIGESTIVE ET ENDOCRINIENNE":
                        document.getElementById("prestationsList").innerHTML= '<option value="CONSULTATIONS"><option value="HOSPITALISATIONS"><option value="INTERVENTIONS"><option value="AUTRES PRESTATIONS">';
                        //  new Option("HOSPITALISATIONS","HOSPITALISATIONS");
        break;
    }
 }

// function display(){
//     prompt("Le boutton fonctionne bien !")
// }


// window.onload = savePatientsPage1();

document.getElementById("savePatientForm").addEventListener("submit",  function(e) {
    e.preventDefault();
     frontSavePatients();
     userInfos();
     redirection();
});
document.getElementById("userInfos").addEventListener("click", function(e) {
    e.preventDefault();
    userInfos();
    redirection1();
});
document.getElementById("userProfilImage").addEventListener("click", function(e) {
    e.preventDefault();
    userInfos();
    redirection1();
});
document.getElementById("centerIdsEntered").addEventListener("change", function(e) {
    // e.preventDefault();
    centersAndPrestationsList();    
});
