var db = require('../config/database.js');
var dbQueries = require('../respositories/databaseFunctions.js');
var fieldModel = require('../models/fieldModel.js');
var farmSummaryModel = require('../models/farmSummaryModel.js');
var cropSummaryModel = require('../models/currentCropsSummaryModel.js');
var weatherSummaryModel = require('../models/currentWeatherSummaryModel.js');

module.exports = {
	GetAllMarkers: function(res) {
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
	},

	GetCurrentFieldDetails: function(req, res) {
		var fieldID = req.param('fieldID');
		var todaysDate = new Date().toISOString().split('T')[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
		var fieldData = this.GetFieldDetails(fieldID, todaysDate, todaysDate);

		return Promise.all([fieldData, locationData]).then(
			([fieldResults]) => {
				var originalFields = JSON.parse(fieldResults);

				var fields = originalFields[0];
				var timeToGrow = 0;
				var cropName = '';
				var expectedHarvest = 0;
				var image2Date = 0;
				var image3Date = 0;
				var image4Date = 0;
				var growthDelay = 0;
				var image = 0; 

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

				var today = new Date(); 
				today.setTime(0,0,0,0,0);
				image = 0;
				
				expectedHarvest = new Date(fields[0]['PlantDate']);
				expectedHarvest.setDate(expectedHarvest.getDate() + timeToGrow); //get the number of days and then add how long it takes the plant to grow. Then convert this into a date.
				if(image2Date >  today)
				{
					image = 1;
				}
				else if(image3Date > today)
				{
					image= 2;
				}
				else if(image4Date > today)
				{
					image = 3; 
				}
				else if(expectedHarvest > today)
				{
					image = 4; 
				}
				
				var field = new fieldModel(
					fields[0]['FarmFieldID'],
					cropName,
					fields[0]['PlantDate'],
					expectedHarvest,
					timeToGrow,
					fields[0]['PHLevel'],
					fields[0]['MoisturePercent'],
					image
				);
				return { field: field };
			}
		);
	},
	/*
    *
    *Retrieve field JSON object populated with entries from the field table.
    *
    */
	GetFieldDetails: function(fieldID, startDate, endDate) {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries
					.FindField(dbconnection, fieldID, startDate, endDate)
					.then(function(result) {
						resolve(result);
					});
			});
		});
	},
	GetFarmSummary: function(req, res) {
		var farmID = req.param('farmID');
		var todaysDate = new Date().toISOString().split('T')[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
		var futureDate = new Date();
		futureDate.setDate(futureDate.getDate() + 4);
		var farmData = this.GetFarmDetails(farmID, todaysDate, todaysDate);
		var locationData = this.GetLocationDetails();
		var markerData = this.GetMarkers();
		var weatherData = this.GetWeatherDetails(farmID, todaysDate, futureDate);
		return Promise.all([farmData, weatherData]).then(
			([fieldResults, weatherResults]) => {
				var farmCrops = JSON.parse(fieldResults);
				//var markers = JSON.parse(markerResults);
				var weather = JSON.parse(weatherResults);
				var today = new Date();
				today.setHours(0,0,0,0);
				var currentCrops = [];
				var locationID = 0; 
				var displayWeather = []; 
				for (i in farmCrops[0])
				{
					var expectedHarvest = new Date(farmCrops[0][i]['PlantDate']);
					expectedHarvest.setDate(expectedHarvest.getDate() + farmCrops[0][i]["TimeToMature"]);
					if(expectedHarvest > today)
					{
						var crop = new cropSummaryModel(farmCrops[0][i]["CropName"], expectedHarvest);
						currentCrops.push(crop);
					}
				}

				var date = new Date();
				var time = date.getHours() + ":00:00";
				
				for(i in weather[0])
				{
					console.log(weather[0][i]["RecordDate"]);
					var newDate = todaysDate + "T23:00:00.000Z";
					console.log(newDate);
					console.log(weather[0][i]["CurrentTime"]);
					console.log(time);
					if(String(weather[0][i]["RecordDate"]) == String(newDate));
					{
						console.log("works");
					}
				}
				//(weather[0][i]["CurrentTime"] == time)
				//get all weather
				//get weather for todays date and todays time 
				//get weather for tomoorrow at noon and so on for 5 days

				for (i in markers[0])
				{
					if((markers[0][i]["Type"]=="Farm") && (markers[0][i]["FarmID"] == farmID))
					{
						locationID = markers[0][i]["LocationID"];
					}	
				}


				//console.log(weather);
				var farm = new farmSummaryModel(
					crops = currentCrops,
					weather = 0
				);
				return {farm: farm};
			}
		
		);
		//return res.json({field: field});
	},
	/*
    
    *Retrieve farm JSON object populated with entries from the farm table.
    *
    */
	GetFarmDetails: function(farmID, startDate, endDate) {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries
					.FindFarm(dbconnection, farmID, startDate, endDate)
					.then(function(result) {
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
	GetWeatherDetails: function(farmID, todaysDate, futureDate) {
		return new Promise(function(resolve, reject) {
			db.Connect().then(function(dbconnection) {
				dbQueries.FindWeather(dbconnection,farmID, todaysDate, futureDate).then(function(result) {
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
