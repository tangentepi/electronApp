function randomString(stringLength){
    var stringList = new Array("a", "b", "c", "d", "d", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w" ,"x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    var str = '';
    for(i=0; i<stringLength; i++){
        str = str + stringList[Math.floor(Math.random()*stringList.length)];
    }
    return str;
}