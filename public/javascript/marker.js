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
		var marker = L.marker([56.4981776, -3.0744827], {
			elevation: 0,
			title: 'Farm'
		}).addTo(map);
		marker.bindPopup(customPopup, customOptions).openPopup();
	}
});
