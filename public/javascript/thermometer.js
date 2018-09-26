$(document).ready(function() {
    temp();
    water();
});

function temp() {
    var elem = document.getElementById("mercury");
    var temp = -4;
    temp = $("#temperatureVal").data().bind;
    $("#temperature").show();
    var height = 0;
    var bottom = -100;
    var id = setInterval(frame, 10);
    function frame() {
        if (height >= 80) {
            clearInterval(id);
        } else {
            height++;
            bottom++;
            console.log(temp);
            elem.style.bottom = bottom + "px";
            elem.style.height = height + "px";
        }
        /*else if(height >= temp){
            height--; 
            elem.style.height = height - '%'; 
        }*/
    }
}

function water() {
    var elem = document.getElementById("water");
    var temp = -4;
    temp = $("#humidityVal").data().bind;
    $("#humidity").show();
    var height = 0;
    var bottom = -100;
    var id = setInterval(frame, 10);
    function frame() {
        if (height >= 50) {
            clearInterval(id);
        } else {
            height++;
            bottom++;
            console.log(temp);
            elem.style.bottom = bottom + "px";
            elem.style.height = height + "px";
        }
        /*else if(height >= temp){
            height--; 
            elem.style.height = height - '%'; 
        }*/
    }
}
