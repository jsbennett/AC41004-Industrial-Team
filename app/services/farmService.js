var db = require('../config/database.js');
var dbQueries = require('../respositories/databaseFunctions.js');
var fieldModel = require('../models/fieldModel.js');
var farmModel = require('../models/farmModel.js');

module.exports = {
<<<<<<< HEAD
	GetAllMarkers: function(res) {
		var markerData = this.GetMarkers();
		return Promise.all([markerData]).then(([markerResults]) => {
			var originalMarkers = JSON.parse(markerResults);
			var markers = originalMarkers[0];
			console.log(markers);
			return { markers: markers };
		});
	},

	GetMarkers: function() {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries.FindMarkers(dbconnection).then(function(result) {
					resolve(result);
				});
			});
		});
	},

	GetCurrentFieldDetails: function(req, res) {
		var fieldID = req.param('fieldID');
		var todaysDate = new Date().toISOString().split('T')[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
		var fieldData = this.GetFieldDetails(fieldID, todaysDate, todaysDate);
		var locationData = this.GetLocationDetails();

		return Promise.all([fieldData, locationData]).then(
			([fieldResults, locationResults]) => {
				var originalFields = JSON.parse(fieldResults);
				var locations = JSON.parse(locationResults);
				console.log(originalFields);
				var fields = originalFields[0];
				var longitude = 0;
				var latitude = 0;
				var timeToGrow = 0;
				var cropName = '';
				var expectedHarvest = 0;
				var image2Date = 0;
				var image3Date = 0;
				var image4Date = 0;
				var growthDelay = 0;

				for (j in locations) {
					if (locations[j]['LocationID'] == fields[0]['LocationID']) {
						longitude = locations[j]['Longitude'];
						latitude = locations[j]['Latitude'];
					}
				}

				//calculate growing periods - add it to final json
				timeToGrow = fields[0]['TimeToMature'];
				cropName = fields[0]['CropName'];

				growthDelay = timeToGrow / 5;
				image2Date = new Date(fields[0]['PlantDate']);
				image2Date.setDate(image2Date.getDate() + growthDelay);
				image3Date = new Date(image2Date);
				image3Date.setDate(image3Date.getDate() + growthDelay);
				image4Date = new Date(image3Date);
				image4Date.setDate(image4Date.getDate() + growthDelay);

				expectedHarvest = new Date(fields[0]['PlantDate']);
				expectedHarvest.setDate(expectedHarvest.getDate() + timeToGrow); //get the number of days and then add how long it takes the plant to grow. Then convert this into a date.

				var field = new fieldModel(
					fields[0]['FarmFieldID'],
					longitude,
					latitude,
					cropName,
					fields[0]['PlantDate'],
					expectedHarvest,
					timeToGrow,
					fields[0]['PHLevel'],
					fields[0]['MoisturePercent'],
					fields[0]['PlantDate'],
					image2Date,
					image3Date,
					image4Date,
					expectedHarvest
				);
				return { field: field };
			}
		);
=======
	/*
    *
    * Retrieves all the details for the farm and puts then into one JSON
    * 
    */
	GetAllFarmDetails: function(res) {
		var todaysDate = new Date().toISOString().split('T')[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object

		var fieldData = this.GetFieldDetails('2018-09-12', '2018-09-12');
		var farmData = this.GetFarmDetails();
		var locationData = this.GetLocationDetails();
		var weatherData = this.GetWeatherDetails();
		return Promise.all([
			fieldData,
			farmData,
			locationData,
			weatherData
		]).then(
			([fieldResults, farmResults, locationResults, weatherResults]) => {
				var fieldInformation = [];
				var farmInformation = [];
				var fields = JSON.parse(fieldResults);
				var farms = JSON.parse(farmResults);
				var locations = JSON.parse(locationResults);
				var weather = JSON.parse(weatherResults);
				console.log(weather);

				for (i in fields[0]) {
					var cropName = ' ';
					var longitude = 0;
					var latitude = 0;
					var expectedHarvest = 0;
					var timeToGrow = 0;

					for (j in locations) {
						if (
							locations[j]['LocationID'] ==
							fields[0][i]['LocationID']
						) {
							longitude = locations[j]['Longitude'];
							latitude = locations[j]['Latitude'];
						}
					}

					timeToGrow = fields[0][i]['TimeToMature'];
					cropName = fields[0][i]['CropName'];

					expectedHarvest = new Date(fields[0][i]['PlantDate']);
					expectedHarvest.setDate(
						expectedHarvest.getDate() + timeToGrow
					); //get the number of days and then add how long it takes the plant to grow. Then convert this into a date.

					var field = new fieldModel(
						fields[0][i]['FarmFieldID'],
						fields[0][i]['FarmID'],
						longitude,
						latitude,
						cropName,
						fields[0][i]['PlantDate'],
						expectedHarvest,
						timeToGrow,
						fields[0][i]['PHLevel'],
						fields[0][i]['MoisturePercent']
					);
					fieldInformation.push(field);
				}

				for (i in farms) {
					//avg rainfall
					//temperature
					//crops harvested
				}

				return res.json({ fields: fieldInformation });
			}
		);
	},

	GetAllMarkers: function() {
		var markerData = this.GetMarkers();
		return Promise.all([markerData]).then(([markerResults]) => {
			var originalMarkers = JSON.parse(markerResults);
			var markers = originalMarkers[0];
			return { markers: markers };
		});
	},

	GetMarkers: function() {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries.FindMarkers(dbconnection).then(function(result) {
					resolve(result);
				});
			});
		});
>>>>>>> master
	},
	/*
    *
    *Retrieve field JSON object populated with entries from the field table.
    *
    */
<<<<<<< HEAD
	GetFieldDetails: function(fieldID, startDate, endDate) {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries
					.FindField(dbconnection, fieldID, startDate, endDate)
=======
	GetFieldDetails: function(startDate, endDate) {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries
					.FindField(dbconnection, startDate, endDate)
>>>>>>> master
					.then(function(result) {
						resolve(result);
					});
			});
		});
	},
<<<<<<< HEAD
	GetFarmSummary: function(req, res) {
		var farmID = req.param('farmID');
		var todaysDate = new Date().toISOString().split('T')[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
		var farmData = this.GetFarmDetails(farmID, todaysDate, todaysDate);
		var locationData = this.GetLocationDetails();
		return Promise.all([farmData, locationData]).then(
			([fieldResults, locationResults]) => {
				console.log(fieldResults);
			}
		);
		//return res.json({field: field});
	},
=======

>>>>>>> master
	/*
    
    *Retrieve farm JSON object populated with entries from the farm table.
    *
    */
<<<<<<< HEAD
	GetFarmDetails: function(farmID, startDate, endDate) {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries
					.FindFarm(dbconnection, farmID, startDate, endDate)
					.then(function(result) {
						resolve(result);
					});
=======
	GetFarmDetails: function(res) {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries.FindFarm(dbconnection).then(function(result) {
					resolve(result);
				});
>>>>>>> master
			});
		});
	},

	/*
    *
    *Retrieve location JSON object populated with entries from the location table.
    *
    */
	GetLocationDetails: function(res) {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries.FindLocation(dbconnection).then(function(result) {
					resolve(result);
				});
			});
		});
	},

	/*
    *
    *Retrieve weather JSON object populated with entries from the weather table.
    *
    */
	GetWeatherDetails: function(res) {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries.FindWeather(dbconnection).then(function(result) {
					resolve(result);
				});
			});
		});
	},

	/*
    *
    *Retrieve crop JSON object populated with entries from the crop table.
    *
    */
	GetCropDetails: function(res) {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries.FindCrop(dbconnection).then(function(result) {
					resolve(result);
				});
			});
		});
	}
};
