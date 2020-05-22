window.onload = remplissage();

function remplissage(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response = JSON.parse(this.responseText);
            var patients = response.patients;
            for(i=0; i<patients.length; i++){
                alert(`$$$$$$$$$$$\nNom${i-(-1)}: ${patients[i].name}\nPrénom${i-(-1)}: ${patients[i].firstName}\n$$$$$$$$$$$`)
            }
        }
    };
    xhr.open("GET", "http://localhost:3001/api/patients");
    xhr.send();
}