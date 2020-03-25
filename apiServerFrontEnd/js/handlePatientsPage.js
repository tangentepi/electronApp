//Récupération des données de la variable superGlobale sessionStorage
var userId = sessionStorage.userId;
var userToken = sessionStorage.userToken;
var userName = sessionStorage.userName;
var userFirstName = sessionStorage.userFirstName;
//Suppression des données contenues dans la variable superglobale sessionStorage
sessionStorage.clear();
//Début Traitements

window.onload = handlePatient();

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
            alert("Liste des Patients obtenue !");
            alert(`${theLength} Patients trouvés`);
            for(i=0; i<theLength; i++){
                sessionStorage.setItem(`patientId${i}`,`${response.patients[i].patientId}`);
                sessionStorage.setItem(`patientName${i}`,`${response.patients[i].name}`);
                sessionStorage.setItem(`patientFirstName${i}`,`${response.patients[i].firstName}`);
                for(j=0; j<response.patients[i].registrationInfos.length; j++){
                    sessionStorage.setItem(`patient${i}RegistrationDate${j}`,`${response.patients[i].registrationInfos[j].registrationDate}`);
                }
            }
            for (i=0; i<theLength; i++){
                alert(`Identifiant: ${sessionStorage.getItem(`patientId${i}`)}\nNom: ${sessionStorage.getItem(`patientName${i}`)}\nPrénom:${sessionStorage.getItem(`patientFirstName${i}`)}`);
            }

        }
    };
    request2.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response = JSON.parse(this.responseText);
            var theLength = response.centers.length;
            alert("Liste des centres obtnue !");
            alert(`${theLength} Centres trouvés`);
            for(i=0; i<theLength; i++){
                sessionStorage.setItem(`centerId${i}`,`${response.centers[i]._id}`);
                sessionStorage.setItem(`centerWording${i}`,`${response.centers[i].wording}`);
            }
            for(i=0; i<theLength; i++){
                alert(`Identifiant du Centre: ${sessionStorage.getItem(`centerId${i}`)}\nNomdu Centre: ${sessionStorage.getItem(`centerWording${i}`)}`);
            }
        }
    };
    request1.open("GET", "http://localhost:3001/api/patients");
    //request1.setRequestHeader("Authorization", "Bearer "+ sessionStorage.token);
    request1.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTZmYzc1YzQ0YmFmOTBjYjQ2MGYwMDQiLCJpYXQiOjE1ODUxMTE1ODYsImV4cCI6MTU4NTE5Nzk4Nn0.G6IcFXyrjSImCJaNDCV7y9PbnEUJtznL13AhSOpvpxE");
    request1.send();

    request2.open("GET", "http://localhost:3001/api/centers");
    //request2.setRequestHeader("Authorization", "Bearer "+ sessionStorage.token);
    request2.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTZmYzc1YzQ0YmFmOTBjYjQ2MGYwMDQiLCJpYXQiOjE1ODUxMTE1ODYsImV4cCI6MTU4NTE5Nzk4Nn0.G6IcFXyrjSImCJaNDCV7y9PbnEUJtznL13AhSOpvpxE");
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
var stateForm1 = document.getElementById("stateOneForm").addEventListener("submit", function(e){
    e.preventDefault();
    state1();
    redirection1();
})

//Affichage de l'état2
var stateForm2 = document.getElementById("stateTwoForm").addEventListener("submit", function(e){
    e.preventDefault();
    state2();
    redirection2();
})

//Affichage de l'état3
var stateForm3 = document.getElementById("stateThreeForm").addEventListener("submit", function(e){
    e.preventDefault();
    state3();
    redirection3();
})

//Affichage de l'état4
var stateForm4 = document.getElementById("stateFourForm").addEventListener("submit", function(e){
    e.preventDefault();
    state4();
    redirection4();
})