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

function Crop(id) {
	$.ajax({
		url: '/field/' + $('#id').data().bind,
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
		}
	});
}
//
function Soil() {
	$.ajax({
		url: '/soil/' + $('#id').data().bind,
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
		}
	});
}


function Summary() {
	$.ajax({
		url: '/farmSummary/1',
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
		}
	});
}

function Weather() {
	$.ajax({
		url: '/farm/1',
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
		}
	});
}

