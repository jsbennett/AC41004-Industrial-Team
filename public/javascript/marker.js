var map = L.Wrld.map('map', '534aba75bfd7016e2593d59b9f8845df', {
	center: [56.4981776, -3.0744827],
	zoom: 16
});
setTimeout(function() {
	map.setView([56.4981776, -3.0744827], 17, {
		animate: false
	});
}, 5000);
$.ajax({
	url: '/test',
	success: function(data) {
		var customPopup = data;
		var customOptions = {
			maxWidth: '5000',
			className: 'custom'
		};

		var greenIcon = L.icon({
    iconUrl: 'images/farm_marker_green.png',

    iconSize:     [60, 60], // size of the icon
    iconAnchor:   [30, 60], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});

		var marker = L.marker([56.4981776, -3.0744827], {
			elevation: 0,
			title: 'Farm',
			icon: greenIcon
		}).addTo(map);
		marker.bindPopup(customPopup, customOptions).openPopup();
	}
});
