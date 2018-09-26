var farmService = require('./farmService');
var fakeDataService = require('./fakeDataService');
var request = require('request');
var dateFormat = require('dateformat');

var seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
var weathers = [
	'Cloudy',
	'Rain',
	'Sunny',
	'Fog',
	'Lightning',
	'Snow',
	'Windy',
	'Clear'
];

var r = [];
var l = [];

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
	this.crops;

	this.init = function(callback) {
		this.ph = Math.floor(Math.random() * 14);
		this.moisture = Math.floor(Math.random() * 100);
		this.temp = Math.floor(Math.random() * 50 + -10);
		this.humid = Math.floor(Math.random() * 100);
		this.wind = Math.floor(Math.random() * 150);
		this.phAlpha = 2;
		this.moistureAlpha = 20;
		this.tempAlpha = 10;
		this.humidAlpha = 20;
		this.windAlpha = 30;

		farmService.GetAllMarkers().then(function(markerData) {
			markers = markerData.markers;
			farmService.GetCropDetails().then(cropData => {
				this.crops = JSON.parse(cropData);
				callback();
			});
		});
	};

	this.makeData = function(date) {
		for (var i = 0; i < markers.length; i++) {
			r.push(crops[Math.floor(Math.random() * crops.length)].CropID);
			if (l.length <= markers.length) {
				l.push(markers[i].LocationID);
			}
			if (markers[i].Type == 'Field') {
				var marker = markers[i];
				this.makeFarmFieldLoop(marker, new Date(date), i);
			} else {
				var forecast = [];
				for (var j = 0; j < 5; j++) {
					forecast.push(
						this.makeFakeWeatherData(markers[i], j, new Date(date))
					);
				}
				fakeDataService.InsertWeather(forecast);
			}
		}
	};

	this.makeFarmFieldLoop = function(marker, date, i) {
		farmService
			.GetFieldDetails(
				marker.FarmID,
				new Date(0, 0, 0),
				new Date(9999, 0, 0)
			)
			.then(fieldData => {
				var fields = [];
				for (var j = 0; j < 1; j++) {
					fields.push(
						this.makeFakeFieldData(
							marker,
							fieldData,
							new Date(date),
							j,
							r,
							i
						)
					);
				}
				fakeDataService.InsertFarmField(fields);
			});
	};

	this.makeFakeWeatherData = function(marker, dayOffset, startdate) {
		//WeatherID Auto
		//RecordDate
		var date = new Date(startdate);
		date.setDate(date.getDate() + dayOffset);
		//Season
		var season = this.currentSeason(date);
		//Temperature
		var temperature = this.clamp(
			this.smoothRandom(this.tempAlpha, this.temp),
			-10,
			35
		);
		//Weathertype
		var weather = weathers[Math.floor(Math.random() * weathers.length)];
		//Humidity
		var humidity = this.clamp(
			this.smoothRandom(this.humidAlpha, this.humid),
			0,
			100
		);
		//WindStrength
		var windStrength = this.clamp(
			this.smoothRandom(this.windAlpha, this.wind),
			0,
			150
		);
		//FarmID
		var id = marker.FarmID;
		//CurrentTime
		var time = '12:00:00';

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

	this.makeFakeFieldData = function(marker, fieldData, date, j, r, i) {
		fieldData = JSON.parse(fieldData)[0];
		var index = 0;
		var d = new Date(0, 0, 1);
		for (var k = 0; k < fieldData.length; k++) {
			if (
				fieldData[k].FarmFieldID == marker.FarmID &&
				fieldData[k].LocationID == marker.LocationID &&
				new Date(d) < new Date(fieldData[k].PlantDate)
			) {
				d = fieldData[k].PlantDate;
				index = k;
			}
		}
		//FarmFieldID
		var id = marker.FieldID;
		//PHLevel
		var phLevel = this.clamp(
			this.smoothRandom(this.phAlpha, this.ph),
			1,
			14
		);
		//MoisturePercent
		var moisturePercent = this.clamp(
			this.smoothRandom(this.moistureAlpha, this.moisture),
			0,
			100
		);
		//CropID
		var cropID;
		var changePlantDate = false;
		var splitdate = String(d).split('T')[0];
		var tempdate = new Date(
			splitdate.split('-')[0],
			splitdate.split('-')[1],
			splitdate.split('-')[2]
		);
		var ttm;
		for (c in crops) {
			if (crops[c]['CropID'] == r[i]) {
				ttm = crops[c]['TimeToMature'];
			}
		}
		var tempdate = new Date(date);
		var ttmDate = new Date(d);
		ttmDate.setDate(ttmDate.getDate() + ttm);
		if (tempdate > ttmDate) {
			r[i] = crops[Math.floor(Math.random() * crops.length)].CropID;
			cropID = r[i];
			//cropID = 10;
			changePlantDate = true;
		} else {
			cropID = r[i];
		}
		//LocationID
		var location = l[i];
		//PlantDate
		var plantDate;
		if (!changePlantDate) {
			plantDate = dateFormat(d, 'yyyy-mm-dd');
		} else {
			plantDate = dateFormat(date, 'yyyy-mm-dd');
		}

		//RecordDate
		var recordDate = dateFormat(date, 'yyyy-mm-dd');
		//RecordTime
		var recordTime = j + ':00:00';

		var data = {
			id,
			phLevel,
			moisturePercent,
			cropID,
			location,
			plantDate,
			recordDate,
			recordTime
		};
		return data;
	};

	this.smoothRandom = function(factor, start) {
		if (start == 0) {
			start = 1;
		}
		var max = start + factor;
		var min = start - factor;
		return Math.floor(Math.random() * (max - min) + min);
	};

	this.clamp = function(num, min, max) {
		return num <= min ? min : num >= max ? max : num;
	};
}

module.exports = FakeData;
