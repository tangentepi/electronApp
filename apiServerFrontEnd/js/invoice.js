// Récupération des données Utilisateur de la variable superGlobale sessionStorage
var userId = sessionStorage.userId;
var userToken = sessionStorage.userToken;
var userName = sessionStorage.userName;
var userFirstName = sessionStorage.userFirstName;
var theLength = sessionStorage.dataLength;

window.load = invoice();

function userInfos(){
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userToken", userToken);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userFirstName", userFirstName);
}

function randomString(stringLength){
    var stringList = new Array("a", "b", "c", "d", "d", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w" ,"x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    var str = '';
    for(i=0; i<stringLength; i++){
        str = str + stringList[Math.floor(Math.random()*stringList.length)];
    }
    return str;
}

function invoice(){
    if(!userId || userId == undefined){
        alert("Vous n'êtes pas connecté !");  
        document.getElementById("userInfos").value = "TEST MODE";    
    }
    else {

        // Remplissage des champs de la facture
        const invoiceNum = randomString(12).toUpperCase();
        document.getElementById("invoiceNumber").innerHTML += invoiceNum;
        document.getElementById("centerInfos2").innerHTML += sessionStorage.center.toLowerCase();
        document.getElementById("patientInfos").innerHTML += `${sessionStorage.patientFirstName.toLowerCase()} ${sessionStorage.patientName.toUpperCase()}<br />${sessionStorage.patientAddress}`;
        document.getElementById("userInfos2").innerHTML += `${userFirstName.toLowerCase()} ${userName.toUpperCase()}<br/ >${userId.toUpperCase()}`;    
        for(i=0; i<theLength; i++){
            document.getElementById("number").innerHTML += `${i+1}`;
            document.getElementById("prestationWording").innerHTML += `${sessionStorage.getItem(`prestation${i}`).toLowerCase()}`;
            document.getElementById("conventionWording").innerHTML += `${sessionStorage.getItem(`conventionWording${i}`).toLowerCase()}`;
            var cost = sessionStorage.getItem(`prestationCost${i}`);
            document.getElementById("prestationPrice1").innerHTML += `${cost} FCFA`;
            document.getElementById("prestationPrice2").innerHTML = `${parseFloat(cost)+parseFloat(100)} FCFA`;            
            // ou encore: document.getElementById("prestationPrice2").innerHTML = `${cost-0+100} FCFA`;
            var red = sessionStorage.getItem(`reduction${i}`);
            document.getElementById("reduction").innerHTML += `${red} %`;
            document.getElementById("prestationPrice3").innerHTML += `${cost*red/100} FCFA`;
            document.getElementById("prestationTotalPrice").innerHTML += `${cost-(cost*red/100)+100} FCFA`;
        }
        //alert(`Bienvenu Monsieur: ${sessionStorage.getItem("userFirstName")+" "+sessionStorage.getItem("userName")}`);
        //ou document.getElementById("userId").value = sessionStorage.userFirstName.toLowerCase()+" "+sessionStorage.userName.toUpperCase();
        document.getElementById("userInfos").value = `${userFirstName.toLowerCase()} ${userName.toUpperCase()}`;

        
    }
};


