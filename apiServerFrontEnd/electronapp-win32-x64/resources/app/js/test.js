window.onload = test();

function test(){
    var test = new Array();
    for(i=0; i< 12; i++ ){
        test.push(`Value${i}`);
        // alert(test[i]); 
    }
    alert(test.length);
    
    alert(`Valeur otée: ${test.splice(2,1)}`);
    alert(`Valeur otée: ${test.splice(2,1)}`);
    alert(`Valeur otée: ${test.splice(2,1)}`);
    alert(test);
    alert(test.length);
};