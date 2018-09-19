var farmService = require('./farmService');
var fakeDataService = require('./fakeDataService');

var seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
var weathers = [
	'Cloudy',
	'Rain',
	'Sunny',
	'Fog',
	'Lighting',
	'Snow',
	'Windy',
	'Clear'
];

function FakeData() {
	this.ph;
	this.moisture;
	this.temp;
	this.humid;
	this.phAlpha;
	this.moistureAlpha;
	this.tempAlpha;
	this.humidAlpha;
	this.markers;

	this.init = function() {
		this.ph = Math.floor(Math.random() * 14);
		this.moisture = Math.floor(Math.random() * 100);
		this.temp = Math.floor(Math.random() * (45 - -15) + -15);
		this.humid = Math.floor(Math.random() * 100);
		this.wind = Math.floor(Math.random() * 150);
		this.phAlpha = 0.05;
		this.moistureAlpha = 0.1;
		this.tempAlpha = 0.3;
		this.humidAlpha = 0.2;
		this.windAlpha = 0.5;

		farmService.GetAllMarkers().then(function(data) {
			markers = data.markers;
			//console.log(markers);
		});
	};

	this.makeData = function() {
		for (var i = 0; i < markers.length; i++) {
			if (markers[i].Type == 'Field') {
				this.makeFakeFieldData(markers[i]);
			} else {
				var forecast = [];
				for (var j = 0; j < 5; j++) {
					for (var k = 0; k < 24; k++) {
						forecast.push(
							this.makeFakeWeatherData(markers[i], j, k)
						);
					}
				}
				//console.log(forecast);
				fakeDataService.InsertWeather(forecast);
			}
		}
	};

	this.makeFakeWeatherData = function(marker, dayOffset, hour) {
		//WeatherID Auto
		//RecordDate
		var date = new Date();
		date.setDate(date.getDate() + dayOffset);
		//Season
		var season = this.currentSeason(date);
		//Temperature
		var temperature = this.smoothRandom(this.tempAlpha, this.temp);
		//Weathertype
		var weather = weathers[Math.floor(Math.random() * weathers.length)];
		//Humidity
		var humidity = this.smoothRandom(this.humidAlpha, this.humid);
		//WindStrength
		var windStrength = this.smoothRandom(this.windAlpha, this.wind);
		//FarmID
		var id = marker.FarmID;
		//CurrentTime
		var time = hour + ':00:00';

		var data = {
			date,
			season,
			temperature,
			weather,
			humidity,
			windStrength,
			id,
			time
		};
		return data;
	};

	this.currentSeason = function(date) {
		if (
			date.getMonth() == 1 ||
			date.getMonth() == 2 ||
			date.getMonth() == 3
		) {
			return seasons[0];
		} else if (
			date.getMonth() == 4 ||
			date.getMonth() == 5 ||
			date.getMonth() == 6
		) {
			return seasons[1];
		} else if (
			date.getMonth() == 7 ||
			date.getMonth() == 8 ||
			date.getMonth() == 9
		) {
			return seasons[2];
		} else {
			return seasons[3];
		}
	};

	this.makeFakeFieldData = function(marker) {
		//console.log('Fake Field Data');
		//ID
		//FarmFieldID
		//PHLevel
		//MoisturePercent
		//CropID
		//LocationID
		//PlantDate
		//RecordDate
		//RecordTime
		/*console.log(
			'PH Level ' +
				this.smoothRandom(this.phAlpha, this.ph) +
				' ' +
				'Moisture ' +
				this.smoothRandom(this.moistureAlpha, this.moisture) +
				'%'
		);*/
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
