function Test() {
	alert('popup.js');
}

function Soil(e) {
	$.ajax({
		url: '/soil',
		success: function(data) {
			var customOptions = {
				maxWidth: '50000',
				minWidth: '300',
				className: 'custom'
			};
			marker
				.bindPopup($(data).click(function() {})[0], customOptions)
				.openPopup();
			console.log('Success');
		}
	});
}
