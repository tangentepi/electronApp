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
            alert(`Bienvenu Monsieur: ${sessionStorage.getItem("userFirstName")+" "+sessionStorage.getItem("userName")}`);
            //ou document.getElementById("userId").value = sessionStorage.userFirstName.toLowerCase()+" "+sessionStorage.userName.toUpperCase();
            document.getElementById("userInfos").value = `${userFirstName.toLowerCase()} ${userName.toUpperCase()}`;
            alert(`La taille du Tableau sessionStorage vaut: ${sessionStorage.length}`);
        }
        // Remplissage du tableau
        var name = new Array();
        var firstName = new Array();
        var center = new Array();
        var registrationDate = new Array();
        for(i=0; i<sessionStorage.length; i++){
            for(j=0; j<sessionStorage.length; j++){
                    if(sessionStorage.getItem(`patientName${i}`) && sessionStorage.getItem(`patientFirstName${i}`) && sessionStorage.getItem(`patient${i}RegistrationDate${j}`)){
                    // alert(`Identifiant: ${sessionStorage.getItem(`patientId${i}`)}\nNom: ${sessionStorage.getItem(`patientName${i}`)}\nPrénom: ${sessionStorage.getItem(`patientFirstName${i}`)}\nDates d'enregistrement: ${sessionStorage.getItem(`patient${i}RegistrationDate${j}`)}`);
                    name.push(sessionStorage.getItem(`patientName${i}`));
                    firstName.push(sessionStorage.getItem(`patientFirstName${i}`));
                    registrationDate.push(sessionStorage.getItem(`patient${i}RegistrationDate${j}`));
                }
            }
        };
            
        for(i=0; i<sessionStorage.length; i++){
            if(sessionStorage.getItem(`centerWording${i}`)){
                center.push(sessionStorage.getItem(`centerWording${i}`));
            }
        }
        for(i=0; i<registrationDate.length; i++){
            // alert(`Identifiant: ${sessionStorage.getItem(`patientId${i}`)}\nNom: ${sessionStorage.getItem(`patientName${i}`)}\nPrénom: ${sessionStorage.getItem(`patientFirstName${i}`)}\nDates d'enregistrement: ${sessionStorage.getItem(`patient${i}RegistrationDate${j}`)}`);
            var t1 = new Date(`${registrationDate[i]}`);
            var t2 = t1.getDate()+"/ "+t1.getMonth()+"/ "+t1.getFullYear();
            document.getElementById("stateOneTableBody").innerHTML += `<tr><td>${name[i]}</td><td>${firstName[i]}</td><td>${center[0]}</td><td>${t2}</td></tr>`
        };
        //Suppression des données contenues dans la variable superglobale sessionStorage
        // sessionStorage.clear();
        
        // Nouveau remplissage de la variable superglobale sessionStorage, avec les information de connexion de l'utilisateur
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userToken", userToken);
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("userFirstName", userFirstName);
};



