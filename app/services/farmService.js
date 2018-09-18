var db = require('../config/database.js');
var dbQueries = require('../respositories/databaseFunctions.js');
var fieldModel = require('../models/fieldModel.js');
var farmModel = require('../models/farmModel.js');

module.exports = {
	/*
    *
    * Retrieves all the details for the farm and puts then into one JSON
    * 
    */
	GetAllFarmDetails: function(res) {
		var fieldData = this.GetFieldDetails();
		var farmData = this.GetFarmDetails();
		var cropData = this.GetCropDetails();
		var locationData = this.GetLocationDetails();
		return Promise.all([fieldData, farmData, cropData, locationData]).then(
			([fieldResults, farmResults, cropResults, locationResults]) => {
				var fieldInformation = [];
				var farmInformation = [];
				var fields = JSON.parse(fieldResults);
				var farms = JSON.parse(farmResults);
				var crops = JSON.parse(cropResults);
				var locations = JSON.parse(locationResults);
				for (i in farms) {
					//avg rainfall
					//temperature
					//crops harvested
				}

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

					for (j in crops) {
						if (crops[j]['CropID'] == fields[0][i]['CropID']) {
							timeToGrow = crops[j]['TimeToMarture'];
							cropName = crops[j]['CropName'];
						}
					}
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
				return res.json({ fields: fieldInformation });
			}
		);
	},

	/*
    *
    *Retrieve field JSON object populated with entries from the field table.
    *
    */
	GetFieldDetails: function() {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries.FindField(dbconnection).then(function(result) {
					resolve(result);
				});
			});
		});
	},

	/*
    
    *Retrieve farm JSON object populated with entries from the farm table.
    *
    */
	GetFarmDetails: function(res) {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries.FindFarm(dbconnection).then(function(result) {
					resolve(result);
				});
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
