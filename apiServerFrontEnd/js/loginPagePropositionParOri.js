
function frontLogin() {
    var body = {
        email: document.getElementById("emailEntered").value,
        password: document.getElementById("passwordEntered").value
    };
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          var response = JSON.parse(this.responseText);
          var userTokenReceived = response.token;
          var userIdReceived = response.userId;
          var userName = response.userName;
          var userFirstName = response.userFirstName;
          sessionStorage.clear();
          sessionStorage.setItem("userId", userIdReceived);
          sessionStorage.setItem("userName", userName);
          sessionStorage.setItem("userFirstName", userFirstName);
          sessionStorage.setItem("userToken", userTokenReceived);
      }
  };
  request.open("POST", "http://localhost:3001/api/users/login");
  request.setRequestHeader("Content-Type", "application/json");
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
// var loginBtn = document.getElementById("loginButton");
// loginBtn.addEventListener('click', frontLogin);

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    frontLogin();
    redirect();
  });
  
//********************************************************************** */

// function frontLogin() {
//     var body = {
//         email: document.getElementById("emailEntered").value,
//         password: document.getElementById("passwordEntered").value
//     };
//   var request = new XMLHttpRequest();
//   request.onreadystatechange = function() {
//       if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//          var response = JSON.parse(this.responseText);
//           var userTokenReceived = response.token;
//           var userIdReceived = response.userId;
//           sessionStorage.clear();
//           sessionStorage.setItem("userId", userIdReceived);
//           sessionStorage.setItem("token", userTokenReceived);
//           alert(`User_Id: ${sessionStorage.getItem("userId")} \nUser_Token: ${sessionStorage.getItem("token")}`);
//       }
//   };
//   request.open("POST", "http://localhost:3001/api/users/login");
//   request.setRequestHeader("Content-Type", "application/json");
//   request.send(JSON.stringify(body));
// }
// function redirect(){
//     setTimeout( function(){
//         if(!sessionStorage.userId){
//         alert("Utilisateur inconu !");
//         document.location.href ="./loginPagePropositionParOri.html";
//         // document.getElementById("loginForm")[0].value = "";
//         // document.getElementById("loginForm")[1].value = "";
//         }
//         else {
//             document.location.href="./handlePatientsPage.html";
//             }}
//     , 3000);
// }
// // var loginBtn = document.getElementById("loginButton");
// // loginBtn.addEventListener('click', frontLogin);

// document.getElementById("loginForm").addEventListener("submit", function(e) {
//     e.preventDefault();
//     frontLogin();
//     redirect();
//   });

