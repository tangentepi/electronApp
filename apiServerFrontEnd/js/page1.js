var btn = document.getElementById("btn-page1");
btn.addEventListener('click', fPage1);
function fPage1(){
    var inpt = document.getElementById("idPage1");
    sessionStorage.setItem("idPage1", inpt.value);
    var val = sessionStorage.getItem("idPage1");
    alert(`USER_ID: ${val}`);
}