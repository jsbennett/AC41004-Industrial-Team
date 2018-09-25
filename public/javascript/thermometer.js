function move() {
    var elem = document.getElementById("mercury");
    var temp = -4;
    //temp = $('#temperature').data().bind;
    var height = 0;
    var rheight=0;
    var id = setInterval(frame, 10);
    function frame() {
        if (height >= 100) {
            clearInterval(id);
        } else{
            height++; 
            rheigh++;
            console.log(temp);
            elem.style.bottom = rheight +'%'; 
            elem.style.height = height +'px'; 
        }
        /*else if(height >= temp){
            height--; 
            elem.style.height = height - '%'; 
        }*/
    }
}