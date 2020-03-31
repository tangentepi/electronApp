window.onload = fillTable();



function fillTable(){
    //Récupération des données Utilisateur de la variable superGlobale sessionStorage
    var userId = sessionStorage.userId;
    var userToken = sessionStorage.userToken;
    var userName = sessionStorage.userName;
    var userFirstName = sessionStorage.userFirstName;
    var dataLength = sessionStorage.dataLength;

        
    //Début Traitements
        // Vérification des informations de connexion
        if(!userId){
            alert("Vous n'êtes pas connecté !");  
            document.getElementById("userInfos").value = "TEST MODE";
            
        }
        else {
            
            document.getElementById("userInfos").value = `${userFirstName.toLowerCase()} ${userName.toUpperCase()}`;
        }
        // Remplissage du tableau
        
        for(i=0; i<dataLength; i++){
            var date = new Date(sessionStorage.getItem(`date${i}`));
            document.getElementById("stateTwoTableBody").innerHTML += `<tr><td>${sessionStorage.getItem(`patientName${i}`)}</td><td>${sessionStorage.getItem(`patientFirstName${i}`)}</td><td>${sessionStorage.getItem(`prestation${i}`)}</td><td>${date.getDate()}/ ${date.getMonth()}/ ${date.getFullYear()} </td><td>${sessionStorage.getItem(`centerWording${i}`)}</td></tr>`
        };
        //Suppression des données contenues dans la variable superglobale sessionStorage
        sessionStorage.clear();
        
        // Nouveau remplissage de la variable superglobale sessionStorage, avec les information de connexion de l'utilisateur
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userToken", userToken);
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("userFirstName", userFirstName);
};



