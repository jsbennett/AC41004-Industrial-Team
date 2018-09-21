var map = L.Wrld.map('map', '534aba75bfd7016e2593d59b9f8845df', {
	center: [56.4941, -2.82058],
	zoom: 14
});
/*setTimeout(function() {
	map.setView([56.4941, -2.82058], 17, {
		animate: false
	});
}, 500);*/

// Sets the map theme
/*map.themes.setTheme(
        L.Wrld.themes.season.Winter,
        L.Wrld.themes.time.Night,
        L.Wrld.themes.weather.Snowy
        );
    */
// Set the season to whichever
// Depending on Current date, change to which ever season with if statement.
map.themes.setSeason(
	L.Wrld.themes.season.Winter // March 1 to May 31
	/*  L.Wrld.themes.season.Autumn  Sep 1 - Nov 30
     *  L.Wrld.themes.season.Winter  Dec 1 - Feb 28
     *  L.Wrld.themes.season.Spring  June 1 - Aug 31
     *  */
);

var farmIcon = L.icon({
	iconUrl: 'images/markers/farm_marker.png',
	iconSize: [60, 60], // size of the icon
	iconAnchor: [30, 60], // point of the icon which will correspond to marker's location
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var fieldIcon = L.icon({
	iconUrl: 'images/markers/field_marker_green.png',
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
				maxWidth: '1000',
				minWidth: '300',
				className: 'custom',
				closeOnClick: false
			};

			if (data['markers'][i].Type == 'Farm') {
				//This marker is a farm
				$.ajax({
					url: '/farm/' + data['markers'][i].FarmID,
					location: markerLocation,
					customOptions,
					success: function(customPopup) {
						var marker = new L.marker(this.location, {
							icon: farmIcon
						}).addTo(map);
						marker.bindPopup(customPopup, customOptions);
					}
				});
			} else {
				//This marker is a field
				$.ajax({
					url: '/field/' + data['markers'][i].FieldID,
					location: markerLocation,
					customOptions,
					success: function(customPopup) {
						var marker = new L.marker(this.location, {
							icon: fieldIcon
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
