//Récupération des données Utilisateur de la variable superGlobale sessionStorage

var userId = sessionStorage.userId;
var userToken = sessionStorage.userToken;
var userName = sessionStorage.userName;
var userFirstName = sessionStorage.userFirstName;
var userPhoneNumber = sessionStorage.userPhoneNumber;

//Suppression des données contenues dans la variable superglobale sessionStorage
sessionStorage.clear();

window.onload = handlePatient();

function userInfos(){
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userToken", userToken);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userFirstName", userFirstName);
    sessionStorage.setItem("userPhoneNumber", userPhoneNumber);
}

function handlePatient(){
    if(!userId || userId == 'undefined'){
        alert("Vous n'êtes pas connecté !");  
        document.getElementById("userInfos").value = "TEST MODE";  
    }
    else {
        document.getElementById("userInfos").value = `${userFirstName.toLowerCase()} ${userName.toUpperCase()}`;
        //ou document.getElementById("userId").value = sessionStorage.userFirstName.toLowerCase()+" "+sessionStorage.userName.toUpperCase();
    }
    };

//Début Traitements

//État 1 *******************************************************************************************************
// LISTE DES PATIENTS ENREGISTRÉS EN ... DU ... AU ...
function state1(){
    var state1Obj = {
        center: document.getElementById("state1Input1").value,
        minDate: document.getElementById("state1Input2").value,
        maxDate: document.getElementById("state1Input3").value
    }
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response = JSON.parse(this.responseText);
            var theLength = response.patients.length;
            // alert("Liste des Patients Obtenue !");
            // alert(state1Obj.center);
            // alert(state1Obj.minDate);
            // alert(state1Obj.maxDate);
            // alert(theLength);
            var patientId = new Array();
            var patientName = new Array();
            var patientFirstName = new Array();
            var center = new Array();
            var date = new Array();
            for(i=0; i<theLength; i++){
                for(j=0; j<response.patients[i].registrationInfos.length; j++){
                    if(response.patients[i].registrationInfos[j].centerIds == state1Obj.center && response.patients[i].registrationInfos[j].registrationDate >=state1Obj.minDate && response.patients[i].registrationInfos[j].registrationDate <= state1Obj.maxDate){
                        patientId.push(response.patients[i].patientId);
                        patientName.push(response.patients[i].name);
                        patientFirstName.push(response.patients[i].firstName);
                        center.push(response.patients[i].registrationInfos[j].centerIds);
                        date.push(response.patients[i].registrationInfos[j].registrationDate);
                    }
                }
            }
            // for(i=0; i<patientId.length; i++){
            //     alert(`${patientId[i]}\n${patientName[i]}\n${patientFirstName[i]}\n${center[i]}\n${date[i]}`);
            // }
            for(i=0; i<patientId.length; i++){
                sessionStorage.setItem(`id${i}`, patientId[i]);
                sessionStorage.setItem(`name${i}`, patientName[i]);
                sessionStorage.setItem(`firstName${i}`, patientFirstName[i]);
                sessionStorage.setItem(`center${i}`, center[i]);
                sessionStorage.setItem(`date${i}`, date[i]);
            }
            sessionStorage.setItem("dataLength", patientId.length);            
        }

    }
    request.open("GET", "http://localhost:3001/api/patients");
    request.setRequestHeader("Authorization", "Bearer "+userToken);
    request.send();
};
function redirection1(){
    setTimeout( function(){
        if(!userId){
        alert("Erreur d'affichage de l'état; vous n'êtes pas connecté");
        //document.location.href ="./handlePatientsPage.html";
        // document.getElementById("loginForm")[0].value = "";
        // document.getElementById("loginForm")[1].value = "";
        }
        else if (sessionStorage.dataLength != undefined){
            document.location.href="./state1.html";
            }}
            , 1000);
        };
            
//État 2 *******************************************************************************************************
// LISTE DES PATIENTS AYANT FAIT L'OBJET DE ... DU ... AU ...
    
function state2(){
    var request1 = new XMLHttpRequest();
    request1.onreadystatechange = function(){
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response1 = JSON.parse(this.responseText);
            var request2 = new XMLHttpRequest();
            // Traitement après la requête 1
            request2.onreadystatechange = function(){
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                    var response2 = JSON.parse(this.responseText);
                    // Traitement après la requête 2
                    // Traitement après les deux requêtes
                    const prestation = document.getElementById("state2Input1").value;
                    const min = document.getElementById("state2Input2").value;
                    const max = document.getElementById("state2Input3").value;
                    var patients = response1.patients;
                    var centers = response2.centers;
                    var idArray = new Array();
                    var idArray1 = new Array();
                    var idArray2 = new Array();
                    var nameArray = new Array();
                    var nameArray1 = new Array();
                    var firstNameArray = new Array();
                    var firstNameArray1 = new Array();
                    var centerArray = new Array();
                    var centerArray1 = new Array();
                    var centerArray2 = new Array();
                    var prestationArray = new Array();
                    var prestationArray2 = new Array();
                    var dateArray = new Array();
                    var dateArray1 = new Array();
                    var dateArray2 = new Array();
                    // Traiment sur la collection Patients
                    for(i=0; i<patients.length; i++){
                        for(j=0; j<patients[i].registrationInfos.length; j++){
                            if(patients[i].registrationInfos[j].registrationDate > min && patients[i].registrationInfos[j].registrationDate < max){
                                idArray1.push(patients[i].patientId);
                                nameArray1.push(patients[i].name);
                                firstNameArray1.push(patients[i].firstName);
                                centerArray1.push(patients[i].registrationInfos[j].centerIds);
                                dateArray1.push(patients[i].registrationInfos[j].registrationDate);
                            }
                        }
                    }
                    // Traitement sur la collection Centre
                    for(i=0; i<centers.length; i++){
                        for(j=0; j<centers[i].registrationInfos.length; j++){
                            if(centers[i].prestationIds[j] == prestation && centers[i].registrationInfos[j].registrationDate >= min && centers[i].registrationInfos[j].registrationDate <= max){
                                idArray2.push(centers[i].registrationInfos[j].patientIds);
                                prestationArray2.push(centers[i].prestationIds[j]);
                                centerArray2.push(centers[i].wording);
                                dateArray2.push(centers[i].registrationInfos[j].registrationDate);
                            }
                        }
                    }
                    // alert(idArray2.length);
                    // alert(idArray1.length);
                    // // Traiment commun aux deux collection Centre et Patients
                    // for(i=0; i<idArray2.length; i++){
                    //     for(j=0; j<idArray1.length; j++){
                    //         if(idArray2[i] == idArray1[j]){
                    //             idArray.push(idArray1.splice(j,1));
                    //             nameArray.push(nameArray1.splice(j,1));
                    //             firstNameArray.push(firstNameArray1.splice(j,1));
                    //             centerArray.push(centerArray1.splice(j,1));
                    //             dateArray.push(dateArray1.splice(j,1));
                    //             prestationArray.push(prestationArray2[i]);
                    //             j-=1;
                    //         }
                    //     }
                    // }

                    for(i=0; i<idArray1.length; i++){
                        for(j=0; j<idArray2.length; j++){
                            if(idArray1[i] == idArray2[j]){
                                idArray.push(idArray2.splice(j,1));
                                nameArray.push(nameArray1[i]);
                                firstNameArray.push(firstNameArray1[i]);
                                centerArray.push(centerArray2.splice(j,1));
                                dateArray.push(dateArray2.splice(j,1));
                                prestationArray.push(prestationArray2.splice(j,1));
                                j=0;
                            }
                        }
                    }

                    for(i=0; i<idArray.length; i++){
                        sessionStorage.setItem(`patientId${i}`, idArray[i]);
                        sessionStorage.setItem(`patientName${i}`, `${nameArray[i]}`);
                        sessionStorage.setItem(`patientFirstName${i}`, firstNameArray[i]);
                        sessionStorage.setItem(`centerWording${i}`, centerArray[i]);
                        sessionStorage.setItem(`prestation${i}`, prestationArray[i]);
                        sessionStorage.setItem(`date${i}`, dateArray[i]);
                        // alert(`Patient Id: ${sessionStorage.getItem(`patientId${i}`)}\nPatient Name: ${sessionStorage.getItem(`patientName${i}`)}\nPatient FirstName: ${sessionStorage.getItem(`patientFirstName${i}`)}\nCenter: ${sessionStorage.getItem(`centerWording${i}`)}\nPrestation: ${sessionStorage.getItem(`prestation${i}`)}\nDate: ${sessionStorage.getItem(`date${i}`)}`);
                    }
                    sessionStorage.setItem("dataLength",idArray.length);
                    // var testArray = new Array();
                    // for(i=0; i<idArray.length; i++){
                    //     testArray[i] =  sessionStorage.getItem(`patientName${i}`)
                    //     alert(testArray[i]);
                    // }
                }
            };
            request2.open("GET", "http://localhost:3001/api/centers");
            request2.setRequestHeader("Authorization", "Bearer "+userToken);
            request2.send();
        }
    };
    request1.open("GET", "http://localhost:3001/api/patients");
    request1.setRequestHeader("Authorization", "Bearer "+userToken);
    request1.send();
};

function redirection2(){
    setTimeout( function(){
        if(!userId){
        alert("Erreur d'affichage de l'état; vous n'êtes pas connecté");
        }
        else if(sessionStorage.dataLength != undefined) {
            document.location.href="./state2.html";
            }
        }
            , 1000
            );
};

//État 3 *******************************************************************************************************
// LISTE DES PRESTATIONS COÛTANT PLUS DE ...

function state3(){
    var price = document.getElementById("priceInput").value;
    var request1 = new XMLHttpRequest();
    request1.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response1 = JSON.parse(this.responseText);
            // alert("Liste de prestations obtenue !");
            // alert(`Le prix entré est :${document.getElementById("priceInput").value}`);
            var prestation = new Array();
            var center = new Array();
            var cost = new Array();
            for(i=0; i<response1.prestations.length; i++){
                for(j=0; j<response1.prestations[i].centerIds.length; j++){
                    if(response1.prestations[i].cost[j]>= price){
                        prestation.push(response1.prestations[i].wording);
                        center.push(response1.prestations[i].centerIds[j]);
                        cost.push(response1.prestations[i].cost[j]);
                    }
                }
            }
            // alert(`Prestation: ${prestation}\nCentres correspondants: ${center}\nPrix correspondants: ${cost}`);
            for(i=0; i<prestation.length; i++){
                sessionStorage.setItem(`prestation${i}`, `${prestation[i]}`);
                sessionStorage.setItem(`center${i}`, `${center[i]}`);
                sessionStorage.setItem(`cost${i}`, `${cost[i]}`);
            }
            sessionStorage.setItem("dataLength", `${prestation.length}`);
            // alert(sessionStorage.theLength);
            // for(i=0; i<prestation.length; i++){
            //     alert(`Prestation: ${sessionStorage.getItem(`prestation${i}`)}\nPrix: ${sessionStorage.getItem(`cost${i}`)}\nCentre: ${sessionStorage.getItem(`center${i}`)}`);
            // }
        }
    }
    request1.open("GET", "http://localhost:3001/api/prestations");
    request1.setRequestHeader("Authorization", "Bearer "+userToken);
    request1.send();
};
function redirection3(){
    setTimeout( function(){
        if(!userId){
        alert("Erreur d'affichage de l'état; vous n'êtes pas connecté");
        }
        else if (sessionStorage.dataLength != undefined){
            document.location.href="./state3.html";
            }
        }
            , 1000
            );
};

//État 4 *******************************************************************************************************
// LISTE DES PRESTATIONS ENREGISTRÉES DU ... AU ...
function state4(){    
    var request1 = new XMLHttpRequest();
    request1.onreadystatechange = function(){
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response1 = JSON.parse(this.responseText);
            // alert("Obtention de la liste des Patients effectuée ... ... ");
            var request2 = new XMLHttpRequest();
            // Traitement après la requête 1
            request2.onreadystatechange = function(){
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                    var response2 = JSON.parse(this.responseText);
                    // Traitement après la requête 2
                    
                    // alert("Obtention de la liste des Centres effectuée ... ...");
                    // Traitement après les deux requêtes
                    // const prestation = document.getElementById("state2Input1").value;
                    const min = document.getElementById("state4Input1").value;
                    const max = document.getElementById("state4Input2").value;
                    var patients = response1.patients;
                    var centers = response2.centers;
                    var idArray = new Array();
                    var idArray1 = new Array();
                    var idArray2 = new Array();
                    var nameArray = new Array();
                    var nameArray1 = new Array();
                    var firstNameArray = new Array();
                    var firstNameArray1 = new Array();
                    var centerArray = new Array();
                    var centerArray1 = new Array();
                    var centerArray2 = new Array();
                    var prestationArray = new Array();
                    var prestationArray2 = new Array();
                    var dateArray = new Array();
                    var dateArray1 = new Array();
                    var dateArray2 = new Array();
                    // Traiment sur la collection Patients
                    for(i=0; i<patients.length; i++){
                        for(j=0; j<patients[i].registrationInfos.length; j++){
                            if(patients[i].registrationInfos[j].registrationDate>= min && patients[i].registrationInfos[j].registrationDate <= max ){
                                idArray1.push(patients[i].patientId);
                                nameArray1.push(patients[i].name);
                                firstNameArray1.push(patients[i].firstName);
                                centerArray1.push(patients[i].registrationInfos[j].centerIds);
                                dateArray1.push(patients[i].registrationInfos[j].registrationDate);
                            }
                        }
                    }
                    // alert(centerArray1);
                    // alert("Enregistrements des Données de Patients effectué ... ...");
                    // Traitement sur la collection Centre
                    for(i=0; i<centers.length; i++){
                        for(j=0; j<centers[i].registrationInfos.length; j++){
                            if(centers[i].registrationInfos[j].registrationDate >= min && centers[i].registrationInfos[j].registrationDate <= max){
                                idArray2.push(centers[i].registrationInfos[j].patientIds);
                                prestationArray2.push(centers[i].prestationIds[j]);
                                centerArray2.push(centers[i].wording);
                                dateArray2.push(centers[i].registrationInfos[j].registrationDate);
                            }
                        }
                    }
                    // alert(prestationArray2);
                    // alert("Enregistrements des Données de Centre effectué ... ...");
                    // for(i=0; i<idArray1.length; i++){
                    //     for(j=0; j<idArray2.length; j++){
                    //         if(idArray2[i] == idArray1[j]){
                    //             idArray.push(idArray2.splice(j,1));
                    //             nameArray.push(nameArray1[i]);
                    //             firstNameArray.push(firstNameArray1[i]);
                    //             centerArray.push(centerArray1[i]);
                    //             dateArray.push(dateArray1[i]);
                    //             prestationArray.push(prestationArray2.splice(j,1));
                    //             j-=1;
                    //         }
                    //     }
                    // }
                    
 
                    for(i=0; i<idArray1.length; i++){
                        for(j=0; j<idArray2.length; j++){
                            if(idArray1[i] == idArray2[j]){
                                idArray.push(idArray2.splice(j,1));
                                nameArray.push(nameArray1[i]);
                                firstNameArray.push(firstNameArray1[i]);
                                centerArray.push(centerArray2.splice(j,1));
                                dateArray.push(dateArray2.splice(j,1));
                                prestationArray.push(prestationArray2.splice(j,1));
                                j=0;
                                // Les Name et les FirstName sont récupérés dans les documents Patients
                                // Les Wording, les Prestations et les registrationDate sont récupérés dans les Centers
                            }
                        }
                       
                    }
                    // alert(prestationArray);

                    // alert("Enregistrements Précédent l'enregistrement dans la superglobale effectué ... ...");
                    for(i=0; i<idArray.length; i++){
                        sessionStorage.setItem(`patientId${i}`, idArray[i]);
                        sessionStorage.setItem(`patientName${i}`, nameArray[i]);
                        sessionStorage.setItem(`patientFirstName${i}`, firstNameArray[i]);
                        sessionStorage.setItem(`centerWording${i}`, centerArray[i]);
                        sessionStorage.setItem(`prestation${i}`, prestationArray[i]);
                        sessionStorage.setItem(`date${i}`, dateArray[i]);
                    }
                    sessionStorage.setItem("dataLength",idArray.length);
                    // alert("Enregistrements dans la superglobale effectué;\nRedirection ... ...");
                }
            };
            request2.open("GET", "http://localhost:3001/api/centers");
            request2.setRequestHeader("Authorization", "Bearer "+userToken);
            request2.send();
        }
    };
    request1.open("GET", "http://localhost:3001/api/patients");
    request1.setRequestHeader("Authorization", "Bearer "+userToken);
    request1.send();
};
function  redirection4(){
    
    setTimeout( function(){
        if(!userId){
        alert("Erreur d'affichage de l'état; vous n'êtes pas connecté");
        }
        else if(sessionStorage.dataLength != undefined) {
            document.location.href="./state4.html";
            }
        }
            , 1000
            );
};
function frontFindAPatient(){
    var searchCriteria = {
        patientId : document.getElementById("findPatient").value
    };
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response = JSON.parse(this.responseText);
            var patient = response.patients;
            // alert(response.patients.name);
            sessionStorage.setItem("patientId", `${patient.patientId}`);
            sessionStorage.setItem("patientName", `${patient.name}`);
            sessionStorage.setItem("patientFirstName", `${patient.firstName}`);
            sessionStorage.setItem("patientBirthDate", `${patient.birthDate}`);
            sessionStorage.setItem("patientPieceNumber", `${patient.pieceNumber}`);
            sessionStorage.setItem("patientGender", `${patient.gender}`);
            sessionStorage.setItem("patientAddress", `${patient.address}`);
            sessionStorage.setItem("patientTypeOfPiece", `${patient.typeOfPiece}`);
            sessionStorage.setItem("patientPlaceOfResidence", `${patient.placeOfResidence}`);
            sessionStorage.setItem("patientPhoneNumber", `${patient.phoneNumber}`);
            sessionStorage.setItem("patientEmployer", `${patient.employer}`);
            sessionStorage.setItem("patientElectricityRelease", `${patient.electricityRelease}`);
            sessionStorage.setItem("patientWaterClearance", `${patient.waterClearance}`);
            sessionStorage.setItem("patientNationality", `${patient.nationality}`);
            sessionStorage.setItem("patientFatherFullName", `${patient.fatherFullName}`);
            sessionStorage.setItem("patientMotherFullName", `${patient.motherFullName}`);
            sessionStorage.setItem("patientConventionId", `${patient.conventionId}`);

            // alert(sessionStorage.patientId);
            // alert(sessionStorage.patientName);
            // alert(sessionStorage.patientFirstName);
        }
    };
    request.open("GET", `http://localhost:3001/api/patients/2/${searchCriteria.patientId}`);
    request.setRequestHeader("Authorization", "Bearer "+userToken);
    request.send();
    // alert("Le bouton Fonctionne !");

}

function redirection5(){
    
    setTimeout( function(){
        if(!userId){
        alert("Erreur d'affichage des Informations du Patient; vous n'êtes pas connecté");
        }else if(!sessionStorage.patientConventionId || sessionStorage.patientConventionId === undefined ){
        alert("Patient non trouvé !");        
        }else{
            document.location.href="./savePatientsPage2.html";
            }
        }
            , 1000
            );
};
//Création de Nouveau Patient

function redirection(){
    setTimeout( function(){
        if(!userId){
            alert("Erreur d'affichage ");        
            document.location.href="./handlePatientsPage.html";
        }
        else {
            document.location.href="./savePatientsPage.html";
        }}
        , 1000);};

// Création d'un nouveau Patient

document.getElementById("newPatient").addEventListener("click", function(e){
    e.preventDefault();
    redirection();
    userInfos();
});

// Recherche d'un Patient

document.getElementById("findForm").addEventListener("submit", function(e){
    e.preventDefault();
    frontFindAPatient();
    userInfos();
    redirection5();
});

//Affichage de l'état1

document.getElementById("stateOneForm").addEventListener("submit", function(e){
    e.preventDefault();
    state1();
    userInfos();
    redirection1();
});

//Affichage de l'état2

document.getElementById("stateTwoForm").addEventListener("submit", function(e){
    e.preventDefault();
    state2();
    userInfos();
    redirection2();
});

//Affichage de l'état3

document.getElementById("stateThreeForm").addEventListener("submit", function(e){
    e.preventDefault();
    state3();
    userInfos();
    redirection3();
});

//Affichage de l'état

document.getElementById("stateFourForm").addEventListener("submit", function(e){
    e.preventDefault();
    state4();
    userInfos();
    redirection4();
});
