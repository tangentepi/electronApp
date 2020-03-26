window.onload = fillTable();



function fillTable(){
//Récupération des données Utilisateur de la variable superGlobale sessionStorage
var userId = sessionStorage.userId;
var userToken = sessionStorage.userToken;
var userName = sessionStorage.userName;
var userFirstName = sessionStorage.userFirstName;
    
//Début Traitements
    // Vérification des informations de connexion
    if(!userId){
        alert("Vous n'êtes pas connecté !");  
        document.getElementById("userInfos").value = "TEST MODE";
        
    }
    else {
        //alert(`Bienvenu Monsieur: ${sessionStorage.getItem("userFirstName")+" "+sessionStorage.getItem("userName")}`);
        //ou document.getElementById("userId").value = sessionStorage.userFirstName.toLowerCase()+" "+sessionStorage.userName.toUpperCase();
        document.getElementById("userInfos").value = `${userFirstName.toLowerCase()} ${userName.toUpperCase()}`;
    }
    // Remplissage du tableau
    for(i=0;i<sessionStorage.length; i++){
        for(j=0;j<sessionStorage.length; j++){
            if(true){
                var name = sessionStorage.getItem(`name${i}`);
                var firstName = sessionStorage.getItem(`firstName${i}`);
                document.getElementById("stateOneTableBody").innerHTML += `<tr><td>${name}</td><td>${firstName}</td></tr>`
            }
        }
    };
    //Suppression des données contenues dans la variable superglobale sessionStorage
    sessionStorage.clear();
    // Nouveau remplissage de la variable superglobale sessionStorage, avec les information de connexion de l'utilisateur
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userToken", userToken);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userFirstName", userFirstName);
}



