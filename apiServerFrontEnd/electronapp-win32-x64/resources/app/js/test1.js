function redirection(){
    document.location.href = "./test2.html";
}
document.getElementById("redirectionButton").addEventListener("click", function(e){
    e.preventDefault();
    redirection();
})