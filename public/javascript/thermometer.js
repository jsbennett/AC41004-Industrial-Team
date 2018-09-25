function move() {
    var elem = document.getElementById("mercury");
    var temp = -4;
    //temp = $('#temperature').data().bind;
    var height = 0;
    var rheight= -200;
    var id = setInterval(frame, 10);
    function frame() {
        if (height >= 150) {
            clearInterval(id);
        } else{
            height++; 
            rheight++;
            console.log(temp);
            elem.style.bottom = rheight +'px'; 
            elem.style.height = height +'px'; 
        }
        /*else if(height >= temp){
            height--; 
            elem.style.height = height - '%'; 
        }*/
    }
}

function wiggle(){
        
}