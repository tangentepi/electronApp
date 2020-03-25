window.onload = state1();

function state1(){
    if(!sessionStorage.userId){
        alert("Vous n'êtes pas connecté !");  
        document.getElementById("userInfos").value = "TEST MODE";
      
        }
        else {
            //alert(`Bienvenu Monsieur: ${sessionStorage.getItem("userFirstName")+" "+sessionStorage.getItem("userName")}`);
            //ou document.getElementById("userId").value = sessionStorage.userFirstName.toLowerCase()+" "+sessionStorage.userName.toUpperCase();
            document.getElementById("userInfos").value = `${sessionStorage.userFirstName.toLowerCase()} ${sessionStorage.userName.toUpperCase()}`;
            }
}
function frontGetAllPatients(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response = JSON.parse(this.responseText);
            var theLength = response.patients.length;
            alert(`*********${theLength} Patients trouvé(s)********`);
            var userName = sessionStorage.userName;
            var userFirstName = sessionStorage.firstName;
            var token = sessionStorage.token;
            sessionStorage.clear();
            for(i=0;i<theLength;i++){
                // alert(`*****Nom numéro ${i}*****\n ${response.patients[i].name}`);
                sessionStorage.setItem(`name${i}`,`${response.patients[i].name}`);
                sessionStorage.setItem(`firstName${i}`,`${response.patients[i].firstName}`);
            }
            sessionStorage.setItem("userName", userName);
            sessionStorage.setItem("firstName", userFirstName);
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("addingFinished","True");
            sessionStorage.setItem("responseLength", (sessionStorage.length-4)/2);
        }
    };
    request.open("GET", "http://localhost:3001/api/patients");
    request.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTZmYzc1YzQ0YmFmOTBjYjQ2MGYwMDQiLCJpYXQiOjE1ODUxMTE1ODYsImV4cCI6MTU4NTE5Nzk4Nn0.G6IcFXyrjSImCJaNDCV7y9PbnEUJtznL13AhSOpvpxE");
    request.send();
};
function fillTable(){
    for(i=0;i<(sessionStorage.length-5)/2; i++){
        var name = sessionStorage.getItem(`name${i}`);
        var firstName = sessionStorage.getItem(`firstName${i}`);
        document.getElementById("stateOneTableBody").innerHTML += `<tr><td>${name}</td><td>${firstName}</td></tr>`
    }
};

var btn = document.getElementById("addRowBtn");
btn.addEventListener("click", function(e){
    e.preventDefault();
    frontGetAllPatients();
    fillTable();

} 
);