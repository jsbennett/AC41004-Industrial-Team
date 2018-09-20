function AddWrapper(data) {
	var width = $('.leaflet-popup-content').css('width');
	return (
		"<div class='leaflet-popup-content' style='width: " +
		width +
		"'>" +
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
