 async function frontLogin() {
    //  alert(`${escapeHTML(document.getElementById("emailEntered").value)}`);
    sessionStorage.clear();
    var userBody = {
        email: document.getElementById("emailEntered").value,
        password: document.getElementById("passwordEntered").value
    };
  var request = new XMLHttpRequest();
  request.onreadystatechange = async function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          var response = await JSON.parse(this.responseText);
          var userTokenReceived = response.token;
          var userIdReceived = response.userId;
          var userName = response.userName;
          var userFirstName = response.userFirstName;
          var userPhoneNumber = response.userPhoneNumber;
          var userPhotoUrl = response.image;
          sessionStorage.setItem("userId", userIdReceived);
          sessionStorage.setItem("userName", userName);
          sessionStorage.setItem("userFirstName", userFirstName);
          sessionStorage.setItem("userToken", userTokenReceived);
          sessionStorage.setItem("userPhoneNumber", userPhoneNumber);
          sessionStorage.setItem("userPhotoUrl", userPhotoUrl);
      }
  };
  request.open("POST", "http://localhost:3001/api/users/login", false);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(userBody));
}
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};
function redirect(){
    setTimeout( function(e){
        if(sessionStorage.userId && sessionStorage.userName && sessionStorage.userFirstName && sessionStorage.userToken && sessionStorage.userPhoneNumber){            
            document.location.href="./handlePatientsPage.html";
        }
        else {
        
        alert("Vérifiez SVP que vous avez entré des information correctes!");
   
        document.location.href ="./loginPagePropositionParOri.html";
        // document.getElementById("loginForm")[0].value = "";
        // document.getElementById("loginForm")[1].value = "";
            }
        }
    , 1000);
}

// var loginBtn = document.getElementById("loginButton");
// loginBtn.addEventListener('click', frontLogin);

document.getElementById("loginForm").addEventListener("submit", function(e) {
    frontLogin();
    redirect();
    e.preventDefault();
  });

//********************************************************************** */
