//Récupération des données de la variable superGlobale sessionStorage
var userId = sessionStorage.userId;
var userToken = sessionStorage.userToken;
var userName = sessionStorage.userName;
var userFirstName = sessionStorage.userFirstName;
//Suppression des données contenues dans la variable superglobale sessionStorage
sessionStorage.clear();
//Début Traitements

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
        //alert(`Bienvenu Monsieur: ${sessionStorage.getItem("userFirstName")+" "+sessionStorage.getItem("userName")}`);
        //ou document.getElementById("userId").value = sessionStorage.userFirstName.toLowerCase()+" "+sessionStorage.userName.toUpperCase();
        document.getElementById("userInfos").value = `${userFirstName.toLowerCase()} ${userName.toUpperCase()}`;
    }
}

//État 1
function state1(){
    var request1 = new XMLHttpRequest();
    var request2 = new XMLHttpRequest();
    request1.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response = JSON.parse(this.responseText);
            var theLength = response.patients.length;
            //alert("Liste des Patients obtenue !");
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
            var k = 0;
            for(i=0; i<theLength; i++){
                for(j=0; j<response.patients[i].registrationInfos.length; j++){
                    if(response.patients[i].registrationInfos[j].centerIds == state1Obj.center){
                            sessionStorage.setItem(`patientId${i}`,`${response.patients[i].patientId}`);
                            sessionStorage.setItem(`patientName${i}`,`${response.patients[i].name}`);
                            sessionStorage.setItem(`patientFirstName${i}`,`${response.patients[i].firstName}`);
                            sessionStorage.setItem(`patient${i}RegistrationDate${j}`,`${response.patients[i].registrationInfos[j].registrationDate}`);
                            sessionStorage.setItem(`patient${i}centerId${j}`,`${response.patients[i].registrationInfos[j].centerIds}`);
                            k=k+1;
                            // alert(`********* Le Patient ${response.patients[i].name} ${response.patients[i].firstName} pourrait ne pas correspondre!\nL'un de ses centres d'enregistrement est: ${response.patients[i].registrationInfos[j].centerIds} *********`);                        
                    }          
                };
            };
            // Affichage des données enregistrées
                if(k==0){
                    alert("Aucun patient ne correspond à la recherche !");
                }else if(k==1){
                    alert(`Seulement ${k} Patient correspond à la recherche !`);
                }else{
                    alert(`${k} Patients correspondent à la recherche !`);
                }

            for (i=0; i<theLength; i++){
                for(j=0; j<response.patients[i].registrationInfos.length; j++){
                    if(sessionStorage.getItem(`patientId${i}`) && sessionStorage.getItem(`patientName${i}`) && sessionStorage.getItem(`patientFirstName${i}`) && sessionStorage.getItem(`patient${i}RegistrationDate${j}`)){
                        alert(`Identifiant: ${sessionStorage.getItem(`patientId${i}`)}\nNom: ${sessionStorage.getItem(`patientName${i}`)}\nPrénom: ${sessionStorage.getItem(`patientFirstName${i}`)}\nDates d'enregistrement: ${sessionStorage.getItem(`patient${i}RegistrationDate${j}`)}`);
                    }
                };
            };

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
            k1=0;
            for(i=0; i<theLength; i++){
                if(response.centers[i].wording == state1Obj.center){
                    k1+=1;
                    sessionStorage.setItem(`centerId${i}`,`${response.centers[i]._id}`);
                    sessionStorage.setItem(`centerWording${i}`,`${response.centers[i].wording}`);
                }
            }
                if(k1==0){
                    alert("Aucun Centre ne correspond à la recherche !");
                }else if(k1==1){
                    alert(`Seulement ${k1} Centre correspond à la recherche !`);
                }else{
                    alert(`${k1} Centres correspondent à la recherche !`);
                }
            for(i=0; i<theLength; i++){
                if(sessionStorage.getItem(`centerId${i}`) && sessionStorage.getItem(`centerWording${i}`)){
                    alert(`Identifiant du Centre: ${sessionStorage.getItem(`centerId${i}`)}\nNom du Centre: ${sessionStorage.getItem(`centerWording${i}`)}`);
                }
            }
        }
    };
    request1.open("GET", "http://localhost:3001/api/patients");
    //request1.setRequestHeader("Authorization", "Bearer "+ sessionStorage.token);
    request1.setRequestHeader("Authorization", "Bearer "+userToken);
    request1.send();

    request2.open("GET", "http://localhost:3001/api/centers");
    //request2.setRequestHeader("Authorization", "Bearer "+ sessionStorage.token);
    request2.setRequestHeader("Authorization", "Bearer "+userToken);
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
    , 1000);};
//État 2
function state2(){}
function redirection2(){};
//État 3
function state3(){};
function redirection3(){};
//État 4
function state4(){};
function redirection4(){};
//Affichage de l'état1
document.getElementById("stateOneForm").addEventListener("submit", function(e){
    e.preventDefault();
    state1();
    userInfos();
    //redirection1();
});

//Affichage de l'état2
// document.getElementById("stateTwoForm").addEventListener("submit", function(e){
//     e.preventDefault();
//     state2();
//     redirection2();
// });

//Affichage de l'état3
// document.getElementById("stateThreeForm").addEventListener("submit", function(e){
//     e.preventDefault();
//     state3();
//     redirection3();
// });

//Affichage de l'état4
// document.getElementById("stateFourForm").addEventListener("submit", function(e){
//     e.preventDefault();
//     state4();
//     redirection4();
// });

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
document.getElementById("newPatient").addEventListener("click", function(e){
    e.preventDefault();
    redirection();
    userInfos();
});
