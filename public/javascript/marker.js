var map = L.Wrld.map('map', '534aba75bfd7016e2593d59b9f8845df', {
	center: [56.4981776, -3.0744827],
	zoom: 16
});
setTimeout(function() {
	map.setView([56.4981776, -3.0744827], 17, {
		animate: false
	});
}, 5000);

var greenIcon = L.icon({
	iconUrl: 'images/farm_marker_green.png',

	iconSize: [60, 60], // size of the icon
	iconAnchor: [30, 60], // point of the icon which will correspond to marker's location
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

$.ajax({
	url: '/test',
	success: function(customPopup) {
		var customOptions = {
			maxWidth: '50000',
			minWidth: '300',
			className: 'custom'
		};

		$.ajax({
			url: '/farmlocations',
			success: function(data) {
				for (var i = 0; i < data.length; i++) {
					var lati = data[i].lat;
					var longi = data[i].long;
					var markerLocation = new L.LatLng(lati, longi);
					var marker = new L.marker(markerLocation).addTo(map);
					marker.bindPopup(
						$(customPopup).click(function() {})[0],
						customOptions
					);
				}
			}
		});
	}
});
