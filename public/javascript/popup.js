var smWidth = 301;
var bgWidth = 900;

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
			$('.leaflet-popup-content').width(smWidth);
		}
	});
}
//
function Soil() {
	$.ajax({
		url: '/soil/' + $('#id').data().bind,
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
			$('.leaflet-popup-content').width(smWidth);
		}
	});
}

function Summary() {
	$.ajax({
		url: '/farmSummary/' + $('#id').data().bind,
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
			$('.leaflet-popup-content').width(smWidth);
			farmSummary();
		}
	});
}

function Weather() {
	$.ajax({
		url: '/farm/' + $('#id').data().bind,
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
			$('.leaflet-popup-content').width(smWidth);
		}
	});
}

function WeatherAnalysis() {
	$.ajax({
		url: '/dailyWeatherAnalysis/' + $('#id').data().bind,
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
			$('.leaflet-popup-content').width(bgWidth);
		}
	});
}

function CropAnalysis() {
	$.ajax({
		url: '/plantAnalysis/' + $('#id').data().bind,
		success: function(data) {
			$('.leaflet-popup-content-wrapper').html(AddWrapper(data));
			$('.leaflet-popup-content').width(bgWidth);
		}
	});
}
