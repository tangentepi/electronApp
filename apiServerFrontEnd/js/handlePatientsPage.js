//Récupération des données Utilisateur de la variable superGlobale sessionStorage

var userId = sessionStorage.userId;
var userToken = sessionStorage.userToken;
var userName = sessionStorage.userName;
var userFirstName = sessionStorage.userFirstName;

//Suppression des données contenues dans la variable superglobale sessionStorage
sessionStorage.clear();

window.onload = handlePatient();

function userInfos(){
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userToken", userToken);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userFirstName", userFirstName);
}

function handlePatient(){
    if(!userId){
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

function state1(){
    var request1 = new XMLHttpRequest();
    var request2 = new XMLHttpRequest();
    request1.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response = JSON.parse(this.responseText);
            var theLength = response.patients.length;
            alert("Liste des Patients obtenue !");
            //alert(`${theLength} Patients trouvés`);
            var state1Obj = {
                center: document.getElementById("state1Input1").value,
                minDate: document.getElementById("state1Input2").value,
                maxDate: document.getElementById("state1Input3").value
            };
            // alert(`Centre: ${state1Obj.center}`);
            // alert(`Date min: ${state1Obj.minDate}`);
            // alert(`Date max: ${state1Obj.maxDate}`);

            //Affectation de données à sessionStorage
            // var k = 0;
            for(i=0; i<theLength; i++){
                for(j=0; j<response.patients[i].registrationInfos.length; j++){
                    if(response.patients[i].registrationInfos[j].centerIds == state1Obj.center && response.patients[i].registrationInfos[j].registrationDate >= state1Obj.minDate && response.patients[i].registrationInfos[j].registrationDate <= state1Obj.maxDate){
                            sessionStorage.setItem(`patientId${i}`,`${response.patients[i].patientId}`);
                            sessionStorage.setItem(`patientName${i}`,`${response.patients[i].name}`);
                            sessionStorage.setItem(`patientFirstName${i}`,`${response.patients[i].firstName}`);
                            sessionStorage.setItem(`patient${i}RegistrationDate${j}`,`${response.patients[i].registrationInfos[j].registrationDate}`);
                            sessionStorage.setItem(`patient${i}centerId${j}`,`${response.patients[i].registrationInfos[j].centerIds}`);
                            // k=k+1;
                            // alert(`********* Le Patient ${response.patients[i].name} ${response.patients[i].firstName} pourrait ne pas correspondre!\nL'un de ses centres d'enregistrement est: ${response.patients[i].registrationInfos[j].centerIds} *********`);                        
                    }          
                };
            };
            // Décompte des Patients correspondants
            // if(k==0){
            //         alert("Aucun patient ne correspond à la recherche !");
            //     }else if(k==1){
            //         alert(`Seulement ${k} Patient correspond à la recherche !`);
            //     }else{
            //         alert(`${k} Patients correspondent à la recherche !`);
            //     }
                        
            // Affichage des Patients enregistrés
            
            // for (i=0; i<theLength; i++){
            //     for(j=0; j<response.patients[i].registrationInfos.length; j++){
            //         if(sessionStorage.getItem(`patientId${i}`) && sessionStorage.getItem(`patientName${i}`) && sessionStorage.getItem(`patientFirstName${i}`) && sessionStorage.getItem(`patient${i}RegistrationDate${j}`)){
            //             alert(`Identifiant: ${sessionStorage.getItem(`patientId${i}`)}\nNom: ${sessionStorage.getItem(`patientName${i}`)}\nPrénom: ${sessionStorage.getItem(`patientFirstName${i}`)}\nDates d'enregistrement: ${sessionStorage.getItem(`patient${i}RegistrationDate${j}`)}`);
            //         }
            //     };
            // };

        }
    };
    request2.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response = JSON.parse(this.responseText);
            var theLength = response.centers.length;
            var state1Obj = {
                center: document.getElementById("state1Input1").value,
                minDate: document.getElementById("state1Input2").value,
                maxDate: document.getElementById("state1Input3").value
            };
                alert("Liste des centres obtnue !");
            // alert(`${theLength} Centres trouvés`);
            // k1=0;
            for(i=0; i<theLength; i++){
                if(response.centers[i].wording == state1Obj.center){
                    // k1+=1;
                    sessionStorage.setItem(`centerId${i}`,`${response.centers[i]._id}`);
                    sessionStorage.setItem(`centerWording${i}`,`${response.centers[i].wording}`);
                }
            }
            // Décompte des Centres correspondants
            //     if(k1==0){
            //         alert("Aucun Centre ne correspond à la recherche !");
            //     }else if(k1==1){
            //         alert(`Seulement ${k1} Centre correspond à la recherche !`);
            //     }else{
            //         alert(`${k1} Centres correspondent à la recherche !`);
            //     }

            // Affichage des Centres enregistrés
            
            // for(i=0; i<theLength; i++){
            //     if(sessionStorage.getItem(`centerId${i}`) && sessionStorage.getItem(`centerWording${i}`)){
            //         alert(`Identifiant du Centre: ${sessionStorage.getItem(`centerId${i}`)}\nNom du Centre: ${sessionStorage.getItem(`centerWording${i}`)}`);
            //     }
            // }
        }
    };
    request1.open("GET", "http://localhost:3001/api/patients");
    //request1.setRequestHeader("Authorization", "Bearer "+ sessionStorage.token);
    request1.setRequestHeader("Authorization", "Bearer "+userToken);
    request1.send();

    request2.open("GET", "http://localhost:3001/api/centers");
    //request2.setRequestHeader("Authorization", "Bearer "+ sessionStorage.token);
    request2.setRequestHeader("Authorization", "Bearer "+ userToken);
    request2.send();

};
function redirection1(){
    setTimeout( function(){
        if(!userId){
        alert("Erreur d'affichage de l'état; vous n'êtes pas connecté");
        //document.location.href ="./handlePatientsPage.html";
        // document.getElementById("loginForm")[0].value = "";
        // document.getElementById("loginForm")[1].value = "";
        }
        else {
            document.location.href="./state1.html";
            }}
            , 1000);
        };
            
//État 2 *******************************************************************************************************
            
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
                    var nameArray1 = new Array();
                    var nameArray = new Array();
                    var firstNameArray = new Array();
                    var firstNameArray1 = new Array();
                    var centerArray = new Array();
                    var centerArray1 = new Array();
                    var prestationArray = new Array();
                    var prestationArray2 = new Array();
                    var dateArray = new Array();
                    var dateArray1 = new Array();
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
                        for(j=0; j<centers[i].prestationIds.length; j++){
                            if(centers[i].prestationIds[j] == prestation){
                                idArray2.push(centers[i].patientIds[j]);
                                prestationArray2.push(centers[i].prestationIds[j]);
                            }
                        }
                    }
                    // Traiment commun aux deux collection Centre et Patients
                    for(i=0; i<idArray2.length; i++){
                        for(j=0; j<idArray1.length; j++){
                            if(idArray2[i] == idArray1[j]){
                                idArray.push(idArray1.splice(j,1));
                                nameArray.push(nameArray1.splice(j,1));
                                firstNameArray.push(firstNameArray1.splice(j,1));
                                centerArray.push(centerArray1.splice(j,1));
                                dateArray.push(dateArray1.splice(j,1));
                                prestationArray.push(prestationArray2[i]);
                                j-=1;
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
        else {
            document.location.href="./state2.html";
            }
        }
            , 1000
            );
};

//État 3 *******************************************************************************************************

function state3(){};
function redirection3(){
    setTimeout( function(){
        if(!userId){
        alert("Erreur d'affichage de l'état; vous n'êtes pas connecté");
        }
        else {
            document.location.href="./state3.html";
            }
        }
            , 1000
            );
};

//État 4 *******************************************************************************************************

function state4(){    
    var request1 = new XMLHttpRequest();
    request1.onreadystatechange = function(){
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response1 = JSON.parse(this.responseText);
            alert("Obtention de la liste des Patients effectuée ... ... ");
            var request2 = new XMLHttpRequest();
            // Traitement après la requête 1
            request2.onreadystatechange = function(){
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                    var response2 = JSON.parse(this.responseText);
                    // Traitement après la requête 2
                    
                    alert("Obtention de la liste des Centres effectuée ... ...");
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
                    var prestationArray = new Array();
                    var prestationArray2 = new Array();
                    var dateArray = new Array();
                    var dateArray1 = new Array();
                    // Traiment sur la collection Patients
                    for(i=0; i<patients.length; i++){
                        for(j=0; j<patients[i].registrationInfos.length; j++){
                            idArray1.push(patients[i].patientId);
                            nameArray1.push(patients[i].name);
                            firstNameArray1.push(patients[i].firstName);
                            centerArray1.push(patients[i].registrationInfos[j].centerIds);
                            dateArray1.push(patients[i].registrationInfos[j].registrationDate);
                        }
                    }
                    alert("Enregistrements des Données de Patients effectué ... ...");
                    // Traitement sur la collection Centre
                    for(i=0; i<centers.length; i++){
                        for(j=0; j<centers[i].prestationIds.length; j++){
                            idArray2.push(centers[i].patientIds[j]);
                            prestationArray2.push(centers[i].prestationIds[j]);
                            // Les Wording seront récupérés dans les données de Patient
                        }
                    }
                    alert("Enregistrements des Données de Centre effectué ... ...");
                    // Traiment commun aux deux collection Centre et Patients
                    for(i=0; i<idArray2.length; i++){
                        for(j=0; j<idArray1.length; j++){
                            if(idArray2[i] == idArray1[j]){
                                idArray.push(idArray1.splice(j,1));
                                nameArray.push(nameArray1.splice(j,1));
                                firstNameArray.push(firstNameArray1.splice(j,1));
                                centerArray.push(centerArray1.splice(j,1));
                                dateArray.push(dateArray1.splice(j,1));
                                prestationArray.push(prestationArray2[i]);
                                j-=1;
                            }
                        }
                    }
                    alert("Enregistrements Précédent l'enregistrement dans la superglobale effectué ... ...");
                    for(i=0; i<idArray.length; i++){
                        sessionStorage.setItem(`patientId${i}`, idArray[i]);
                        sessionStorage.setItem(`patientName${i}`, nameArray[i]);
                        sessionStorage.setItem(`patientFirstName${i}`, firstNameArray[i]);
                        sessionStorage.setItem(`centerWording${i}`, centerArray[i]);
                        sessionStorage.setItem(`prestation${i}`, prestationArray[i]);
                        sessionStorage.setItem(`date${i}`, dateArray[i]);
                    }
                    sessionStorage.setItem("dataLength",idArray.length);
                    alert("Enregistrements dans la superglobale effectué;\nRedirection ... ...");
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
function redirection4(){
    
    setTimeout( function(){
        if(!userId){
        alert("Erreur d'affichage de l'état; vous n'êtes pas connecté");
        }
        else {
            document.location.href="./state4.html";
            }
        }
            , 5000
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