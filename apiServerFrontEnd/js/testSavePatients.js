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
            user: 
            //sessionStorage.userId,
            document.getElementById("userIdsEntered").value,
            registrationDate: document.getElementById("registrationDateEntered").value,
            //Date.now(),            
            center: document.getElementById("centerIdsEntered").value,
    };
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201 ) {
            alert("Enregistrement de Patient Réussi !");
        }
    };
    var token = sessionStorage.token;
    request.open("POST", "http://192.168.0.187:3001/api/patients");
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("Authorization", "Bearer"+" "+token);
    request.send(JSON.stringify(body));
}

function redirect(){
    setTimeout( function(){
        if(!sessionStorage.userId){
        alert("Utilisateur inconu !");
        document.location.href ="./loginPagePropositionParOri.html";
        // document.getElementById("loginForm")[0].value = "";
        // document.getElementById("loginForm")[1].value = "";
        }
        else {
            document.location.href="./handlePatientsPage.html";
            }}
    , 3000);
}
// Ecouteur d'événement et exécution de La fonction savePatient

document.getElementById("savePatientForm").addEventListener("submit", function(e) {
    e.preventDefault();
    frontSavePatients();
    redirect();
});