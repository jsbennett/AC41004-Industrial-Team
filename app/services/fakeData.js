var farmService = require('./farmService');

function FakeData() {
	this.ph = Math.floor(Math.random() * 14);
	this.moisture = Math.floor(Math.random() * 100);
	this.phAlpha = 0.05;
	this.moistureAlpha = 0.1;
	this.markers;

	this.init = function() {
		farmService.GetAllMarkers().then(function(data) {
			markers = data.markers;
			console.log(markers);
		});
	};

	this.makeData = function() {
		for (var i = 0; i < markers.length; i++) {
			if (markers[i].Type == 'Field') {
				this.makeFakeFieldData();
			} else {
				this.makeFakeWeatherData();
			}
		}
	};

	this.makeFakeWeatherData = function() {
		console.log('Fake Weather Data');
		//WeatherID
		//RecordDate
		//Season
		//Temperature
		//Weathertype
		//Humidity
		//WindStrength
		//FarmID
		//CurrentTime
	};

	this.makeFakeFieldData = function() {
		console.log('Fake Field Data');
		//ID
		//FarmFieldID
		//PHLevel
		//MoisturePercent
		//CropID
		//LocationID
		//PlantDate
		//RecordDate
		//RecordTime
		console.log(
			'PH Level ' +
				this.smoothRandom(this.phAlpha, this.ph) +
				' ' +
				'Moisture ' +
				this.smoothRandom(this.moistureAlpha, this.moisture) +
				'%'
		);
	};

	this.smoothRandom = function(factor, start) {
		if (start == 0) {
			start = 1;
		}
		var max = start + start * factor;
		var min = start - start * factor;
		return Math.floor(Math.random() * (max - min) + min);
	};
}

module.exports = FakeData;
