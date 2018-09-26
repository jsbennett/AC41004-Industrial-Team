<<<<<<< HEAD
$(document).ready(function() {
	temp();
	water();
});

function temp() {
	var elem = document.getElementById('mercury');
	var temp = -4;
	temp = $('#temperatureVal').data().bind;
	$('#temperature').show();
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
			elem.style.bottom = bottom + 'px';
			elem.style.height = height + 'px';
		}
		/*else if(height >= temp){
=======
function move() {
    var elem = document.getElementById("mercury");
    var temp = -4;
    //temp = $('#temperature').data().bind;
    var height = 0;
    var bottom= -100;
    var id = setInterval(frame, 10);
    function frame() {
        if (height >= 80) {
            clearInterval(id);
        } else{
            height++; 
            bottom++;
            console.log(temp);
            elem.style.bottom = bottom +'px'; 
            elem.style.height = height +'px'; 
        }
        /*else if(height >= temp){
>>>>>>> eef43f773b818fa70a5391e3d48f9ea1dcf1a881
            height--; 
            elem.style.height = height - '%'; 
        }*/
	}
}

<<<<<<< HEAD
function water() {
	var elem = document.getElementById('water');
	var temp = -4;
	temp = $('#humidityVal').data().bind;
	$('#humidity').show();
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
			elem.style.bottom = bottom + 'px';
			elem.style.height = height + 'px';
		}
		/*else if(height >= temp){
            height--; 
            elem.style.height = height - '%'; 
        }*/
	}
}
=======
function fill() {
    var elem = document.getElementById("water");
    var height = 0;
    var bottom= -120;
    var id = setInterval(frame, 10);
    function frame() {
        if (height >= 65) {
            clearInterval(id);
        } else{
            height++; 
            bottom++;
            elem.style.bottom = bottom +'px'; 
            elem.style.height = height +'px'; 
        }
    }
}
>>>>>>> eef43f773b818fa70a5391e3d48f9ea1dcf1a881
