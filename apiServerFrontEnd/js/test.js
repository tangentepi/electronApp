window.onload = test();

function test(){
    // var test = new Array();
    // for(i=0; i< 12; i++ ){
    //     test.push(`Value${i}`);
    //     // alert(test[i]); 
    // }
    // alert(test.length);
    
    // alert(`Valeur otée: ${test.splice(2,1)}`);
    // alert(`Valeur otée: ${test.splice(2,1)}`);
    // alert(`Valeur otée: ${test.splice(2,1)}`);
    // alert(test);
    // alert(test.length);
};
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};
function remplissage(){
    var value = {
        val1: document.getElementById("val1").value
    };
    var msg0 = escapeHtml(value.val1);
    alert(msg0);
    };
    
document.getElementById("formTest").addEventListener("submit", function(e) {
    remplissage();
    e.preventDefault();
  });
document.getElementById("test").addEventListener("click", function(e) {
   alert("label clicked!");
});