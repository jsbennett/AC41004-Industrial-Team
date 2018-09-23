var map = L.Wrld.map('map', '534aba75bfd7016e2593d59b9f8845df', {
	center: [56.4941, -2.82058],
	zoom: 15
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
/*map.themes
	.setSeason
	//L.Wrld.themes.season.Winter // March 1 to May 31
	//L.Wrld.themes.season.Autumn // Sep 1 - Nov 30
	//L.Wrld.themes.season.Summer // Dec 1 - Feb 28
	//L.Wrld.themes.season.Spring //June 1 - Aug 31
	();*/

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
						marker.bindPopup(
							$(customPopup).click(function() {})[0],
							customOptions
						);
						DynamicMap(marker, customPopup);

						marker.on('popupopen', function(e) {
							var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
							px.y -= e.popup._container.clientHeight / 3.5; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
							map.panTo(map.unproject(px), { animate: true }); // pan to new center
						});
					}
				});
			} else {
				//This marker is a field
				var farmID = data['markers'][i].FarmID;
				$.ajax({
					url: '/field/' + data['markers'][i].FieldID,
					location: markerLocation,
					customOptions,
					farmID,
					success: function(customPopup) {
						var marker = new L.marker(this.location, {
							icon: fieldIcon
						}).addTo(map);
						marker.bindPopup(
							$(customPopup).click(function() {})[0],
							customOptions
						);
						marker.on('popupopen', function(e) {
							var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
							px.y -= e.popup._container.clientHeight / 3; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
							map.panTo(map.unproject(px), { animate: true }); // pan to new center
						});
						$.ajax({
							url: '/farm/' + this.farmID,
							location: markerLocation,
							customOptions,
							marker,
							success: function(customPopup) {
								DynamicMap(marker, customPopup);
							}
						});
					}
				});
			}
		}
	}
});

function DynamicMap(marker, customPopup) {
	marker.on('popupopen', () => {
		var curSeason = $($.parseHTML(customPopup))
			.find('#season')
			.data().bind;
		if (curSeason == 'Spring') {
			map.themes.setSeason(L.Wrld.themes.season.Spring);
		} else if (curSeason == 'Summer') {
			map.themes.setSeason(L.Wrld.themes.season.Summer);
		} else if (curSeason == 'Autumn') {
			map.themes.setSeason(L.Wrld.themes.season.Autumn);
		} else if (curSeason == 'Winter') {
			map.themes.setSeason(L.Wrld.themes.season.Winter);
		}
		var curWeather = $($.parseHTML(customPopup))
			.find('#weather')
			.data().bind;

		if (curWeather == 'Rain') {
			map.themes.setWeather(L.Wrld.themes.weather.Rainy);
		} else if (curWeather == 'Cloudy') {
			map.themes.setWeather(L.Wrld.themes.weather.Overcast);
		} else if (curWeather == 'Sunny') {
			map.themes.setWeather(L.Wrld.themes.weather.Clear);
		} else if (curWeather == 'Snow') {
			map.themes.setWeather(L.Wrld.themes.weather.Snowy);
		} else if (curWeather == 'Fog') {
			map.themes.setWeather(L.Wrld.themes.weather.Foggy);
		}
	});
	marker.on('popupclose', () => {
		map.themes.setWeather(L.Wrld.themes.weather.Clear);
		map.themes.setSeason(L.Wrld.themes.season.Summer);
	});
}
