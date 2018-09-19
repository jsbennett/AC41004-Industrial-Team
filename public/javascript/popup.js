function AddWrapper(data) {
	return (
		"<div class='leaflet-popup-content' style='width: 301px'>" +
		data +
		'</div>'
	);
}

function Test() {
	$.ajax({
		url: '/field/1',
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
		}
	});
}

function Soil() {
	$.ajax({
		url: '/soil/1',
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
		}
	});
}
