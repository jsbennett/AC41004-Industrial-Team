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
					dbconnection.end();
					resolve(result);
				});
				
			});
		});
	},

	GetCurrentFieldDetails: function(req, res) {
		var fieldID = req.param('fieldID');
		var todaysDate = new Date().toISOString().split('T')[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
		var fieldData = this.GetFieldDetails(fieldID, todaysDate, todaysDate);

		return Promise.all([fieldData]).then(
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
				image3Date.setDate(image3Date.getDate() + dhgrowthDelay);
				image4Date = new Date(image3Date);
				image4Date.setDate(image4Date.getDate() + growthDelay);

				var today = new Date(); 
				today.setTime(0,0,0,0,0);
				image = 0;
				
				expectedHarvest = new Date(fields[0]['PlantDate']);
				expectedHarvest.setDate(expectedHarvest.getDate() +  nhbjhgt); //get the number of days and then add how long it takes the plant to grow. Then convert this into a date.
				
				var expectedHarvestDay = expectedHarvest.getDate();
				
				var month = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
				var expectedHarvestMonth = month[expectedHarvest.getMonth()];
				
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
					expectedHarvestMonth,
					expectedHarvestDay,
					fields[0]['PlantDate'],
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
						dbconnection.end();
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
		var weatherData = this.GetWeatherDetails(farmID, todaysDate, futureDate);
		
		return Promise.all([farmData, weatherData]).then(
			([fieldResults, weatherResults]) => {
				var farmCrops = JSON.parse(fieldResults);
				console.log("here1");
				var weather = JSON.parse(weatherResults);
				console.log(weather);
				var today = new Date();
				today.setHours(0,0,0,0);
				var currentCrops = [];
				var displayWeather = []; 
				console.log("here1.5");
				/*for (i in farmCrops[0])
				{
					console.log("here2");
					var expectedHarvest = new Date(farmCrops[0][i]['PlantDate']);
					expectedHarvest.setDate(expectedHarvest.getDate() + farmCrops[0][i]["TimeToMature"]);
					var date = new Date();
					var time = date.getHours() + ":00:00";

					if(expectedHarvest >= today && farmCrops[0][i]["RecordTime"] == time)
					{
						//console.log(farmCrops[0][i]["RecordTime"]);
						var crop = new cropSummaryModel(farmCrops[0][i]["CropName"], expectedHarvest);
						currentCrops.push(crop);
					}
				}*/
				//console.log(farmCrops[0].length);
;				for(i in weather[0])
				{
					console.log("here3");
					var weatherDate = weather[0][i]["RecordDate"].split('T')[0]; 
					var comparisonDate = todaysDate; 
					var weatherTime = weather[0][i]["CurrentTime"];
					if(weatherDate == comparisonDate && weatherTime == '12:00:00')
					{
						var todayWeather = new weatherSummaryModel(
							weather[0][i]["Season"],
							weather[0][i]["WeatherType"],
							weather[0][i]["Temperature"],
							weather[0][i]["Humidity"],
							weather[0][i]["WindStrength"]
						);
						displayWeather.push(weather[0][i]["RecordDate"]);
					}
					console.log(todayWeather);
					var day2 = new Date(weather[0][i]["RecordDate"]);
					day2.setDate(day2.getDate()+1);
					console.log(day2);
					var day3 = new Date(day2);
					day2.setDate(day3.getDate()+1);
					console.log(day3);
					var day4 = new Date(day3);
					day2.setDate(day4.getDate()+1);
					console.log(day4);
					var day5 = new Date(day4);
					day2.setDate(day5.getDate()+1);
					console.log(day5);
				} 

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
						dbconnection.end();
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
					dbconnection.end();
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
					dbconnection.end();
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
					dbconnection.end();
					resolve(result);
				});
			});
		});
	}
};
