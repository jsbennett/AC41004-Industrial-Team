var map = L.Wrld.map('map', '534aba75bfd7016e2593d59b9f8845df', {
	center: [56.4941, -2.82058],
	zoom: 16
});
setTimeout(function() {
	map.setView([56.4941, -2.82058], 17, {
		animate: false
	});
}, 5000);

var greenIcon = L.icon({
	iconUrl: 'images/farm_marker_green.png',
	iconSize: [60, 60], // size of the icon
	iconAnchor: [30, 60], // point of the icon which will correspond to marker's location
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var redIcon = L.icon({
	iconUrl: 'images/farm_marker_red.png',
	iconSize: [60, 60],
	iconAnchor: [30, 60],
	popupAnchor: [-3, -76]
});

$.ajax({
	url: '/api/getMarkers',
	success: function(data) {
		for (var i = 0; i < data['markers'].length; i++) {
			var lati = data['markers'][i].Latitude;
			var longi = data['markers'][i].Longitude;
			var markerLocation = new L.LatLng(lati, longi);
			var todaysDate = new Date();
			var customOptions = {
				maxWidth: '50000',
				minWidth: '300',
				className: 'custom'
			};

			if (data['markers'][i].Type == 'Farm') {
				//This marker is a farm
				$.ajax({
					url: '/farm',
					location: markerLocation,
					customOptions,
					success: function(customPopup) {
						var marker = new L.marker(this.location, {
							icon: greenIcon
						}).addTo(map);
						marker.bindPopup(customPopup, customOptions);
					}
				});
			} else {
				//This marker is a field
				$.ajax({
					url: '/field',
					location: markerLocation,
					customOptions,
					success: function(customPopup) {
						var marker = new L.marker(this.location, {
							icon: redIcon
						}).addTo(map);
						marker.bindPopup(
							$(customPopup).click(function() {})[0],
							customOptions
						);
					}
				});
			}
		}
	}
});
