window.onload = f1Page2();
function f1Page2(){
    alert(`page1 Input: ${sessionStorage.getItem("idPage1")}`);
    var inptFromPage1 = sessionStorage.getItem("idPage1");
    var ID = document.getElementById("idPage2");
    ID.value = inptFromPage1;
}