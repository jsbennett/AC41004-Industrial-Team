function AddWrapper(data) {
	return (
		"<div class='leaflet-popup-content' style='width: 301px'>" +
		data +
		'</div>'
	);
}

function Test() {
	$.ajax({
		url: '/field',
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
		}
	});
}

function Soil() {
	$.ajax({
		url: '/soil',
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
		}
	});
}
