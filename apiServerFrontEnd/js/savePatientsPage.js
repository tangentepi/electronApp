var userId = sessionStorage.userId;
var userToken = sessionStorage.userToken;
var userName = sessionStorage.userName;
var userFirstName = sessionStorage.userFirstName;
window.onload = savePatient();

function savePatient(){
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
    var body = {
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
            //imageUrl: document.getElementById("imageUrlEntered").value,
            conventionId: document.getElementById("conventionIdEntered").value,
            user: document.getElementById("userIdsEntered").value,
            registrationDate: document.getElementById("registrationDateEntered").value,
            //Date.now(),            
            center: document.getElementById("centerIdsEntered").value
    };
    //requête 1: Patient
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201 ) {
            alert("Enregistrement de Patient Réussi !");
        }
    };
    //requête 2: Centre
    var token = sessionStorage.token;
    request.open("POST", "http://localhost:3001/api/patients");
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("Authorization", "Bearer"+" "+userToken);
    request.send(JSON.stringify(body));
}

function redirect(){
        if(!sessionStorage.userId){
        alert("Utilisateur inconu !");
        document.location.href ="./loginPagePropositionParOri.html";
        // document.getElementById("loginForm")[0].value = "";
        // document.getElementById("loginForm")[1].value = "";
        }
        else {
            document.location.href="./handlePatientsPage.html";
            };
}


// window.onload = savePatientsPage1();

document.getElementById("savePatientForm").addEventListener("submit", function(e) {
    e.preventDefault();
    frontSavePatients();
    redirect();
});