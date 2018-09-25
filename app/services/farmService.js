/*
*	name: farmService.js
* 	function: This is the service layer for the application. It acts as the bridge between the repository layer (the data access) and the routes which are used by the front end. 
			  By doing this, this means that the routes and front end does not need to know about the database.

*/
var db = require("../config/database.js");
var dbQueries = require("../respositories/databaseFunctions.js");
var fieldModel = require("../models/fieldModel.js");
var farmSummaryModel = require("../models/farmSummaryModel.js");
var cropSummaryModel = require("../models/currentCropsSummaryModel.js");
var weatherSummaryModel = require("../models/currentWeatherSummaryModel.js");
var weatherAnalysisModel = require("../models/analysisWeatherModel");
var cropAnalysisModel = require("../models/analysisCropsModel.js");

module.exports = {
    /*
	*
	* Returns an JSON object with all the markers locations and IDs
	*
	*/
    GetAllMarkers: function() {
        var markerData = this.GetMarkers();
        return Promise.all([markerData]).then(([markerResults]) => {
            var originalMarkers = JSON.parse(markerResults);
            var markers = originalMarkers[0];
            return { markers: markers };
        });
    },
    GetDailyWeatherData: function(req) {
        var farmID = req.param("farmID");
        var todaysDate = new Date().toISOString().split("T")[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
        var pastDate = new Date();
        pastDate = pastDate.setMonth(pastDate.getMonth() - 6);
        pastDate = new Date(pastDate).toISOString().split("T")[0];
        var futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);
        var weatherData = this.GetWeatherDetails(farmID, pastDate, futureDate);
        return Promise.all([weatherData]).then(([weatherResults]) => {
            var weatherMonths = [];
            var weather = JSON.parse(weatherResults);
            weather = weather[0];
            for (var i = 0; i < 12; i++) {
                var days = [];
                var raining = false;
                var recordCount = 0;
                for (var j = 0; j < weather.length; j++) {
                    if (
                        new Date(weather[j].RecordDate).getMonth().toString() ==
                        String(i)
                    ) {
                        if (
                            weather[j].Weathertype == "Rain" ||
                            weather[j].Weathertype == "Lightning"
                        ) {
                            raining = true;
                        }
                        recordCount++;
                        days.push({
                            temp: weather[j].Temperature,
                            wind: weather[j].WindStrength,
                            humidity: weather[j].Humidity,
                            rain: raining
                        });
                    }
                }
                if (recordCount > 0) {
                    weatherMonths.push({ month: i, days: days });
                } else {
                    weatherMonths.push({ month: i, days: "No Data" });
                }
            }
            return { farmID, weatherMonths };
        });
    },
    GetPlantData: function(req) {
        var farmID = req.param("farmID");
        var todaysDate = new Date().toISOString().split("T")[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
        var pastDate = new Date();
        pastDate = pastDate.setMonth(pastDate.getMonth() - 6);
        pastDate = new Date(pastDate).toISOString().split("T")[0];
        var futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);

        var cropData = this.GetCropDetails();
        var fieldData = this.FindFarm(farmID, pastDate, todaysDate);

        return Promise.all([fieldData, cropData]).then(
            ([fieldResults, cropResults]) => {
                fieldResults = JSON.parse(fieldResults);
                fieldResults = fieldResults[0];
                cropResults = JSON.parse(cropResults);
                var months = [];

                var ids = new Set();
                for (var k = 0; k < fieldResults.length; k++) {
                    ids.add(fieldResults[k].FarmFieldID);
                }
                var idsArr = Array.from(ids);
                var fields = [];

                for (var j = 0; j < idsArr.length; j++) {
                    var months = [];
                    for (var i = 0; i < 12; i++) {
                        var days = [];
                        var noData = false;
                        for (var k = 0; k < fieldResults.length; k++) {
                            if (fieldResults[k].FarmFieldID == idsArr[j]) {
                                if (
                                    new Date(fieldResults[k].RecordDate)
                                        .getMonth()
                                        .toString() == String(i)
                                ) {
                                    days.push({
                                        ph: fieldResults[k].PHLevel,
                                        moisture:
                                            fieldResults[k].MoisturePercent,
                                        date: fieldResults[k].RecordDate
                                    });
                                }
                            }
                        }
                        if (days[i] == null) {
                            noData = true;
                        }

                        months.push({
                            month: i,
                            days,
                            noData
                        });
                    }
                    fields.push({ fieldID: idsArr[j], months });
                }
                return { farmID, fields };
            }
        );
    },
    /*
	*
	* Returns a JSON object of all the details for the current field
	* This is used for displaying the information about a field at a point of interest
	*
	*/
    GetCurrentFieldDetails: function(req) {
        var fieldID = req.param("fieldID");
        var todaysDate = new Date().toISOString().split("T")[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
        var fieldData = this.GetFieldDetails(fieldID, todaysDate, todaysDate);

        return Promise.all([fieldData]).then(([fieldResults]) => {
            var originalFields = JSON.parse(fieldResults);

            var fields = originalFields[0];
            var timeToGrow = 0;
            var cropName = "";
            var expectedHarvest = 0;
            var image2Date = 0;
            var image3Date = 0;
            var image4Date = 0;
            var growthDelay = 0;
            var image = 0;

            timeToGrow = fields[0]["TimeToMature"];
            cropName = fields[0]["CropName"];

            growthDelay = timeToGrow / 5;
            image2Date = new Date(fields[0]["PlantDate"]);
            image2Date.setDate(image2Date.getDate() + growthDelay);
            image3Date = new Date(image2Date);
            image3Date.setDate(image3Date.getDate() + growthDelay);
            image4Date = new Date(image3Date);
            image4Date.setDate(image4Date.getDate() + growthDelay);

            var today = new Date();
            today.setTime(0, 0, 0, 0, 0);
            image = 0;

            expectedHarvest = new Date(fields[0]["PlantDate"]);
            expectedHarvest.setDate(expectedHarvest.getDate() + timeToGrow);

            var expectedHarvestDate = expectedHarvest.getDate();

            var month = [
                "January",
                "Feburary",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];
            var expectedHarvestMonth = month[expectedHarvest.getMonth()];

            var day = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            var expectedHarvestDay = day[expectedHarvest.getDay()];

            if (String(image2Date) >= String(today)) {
                image = 1;
            } else if (String(image3Date) >= String(today)) {
                image = 2;
            } else if (String(image4Date) >= String(today)) {
                image = 3;
            } else if (String(expectedHarvest) >= String(today)) {
                image = 4;
            }

            var field = new fieldModel(
                fields[0]["FarmFieldID"],
                cropName,
                expectedHarvestMonth,
                expectedHarvestDay,
                expectedHarvestDate,
                fields[0]["PlantDate"],
                timeToGrow,
                fields[0]["PHLevel"],
                fields[0]["MoisturePercent"],
                image
            );
            return { field: field };
        });
    },
    /*
	*
	* Returns a JSON object of the information about a farm
	* This is used to display information about all the crops and the weather for the next 5 days in the summary tab of the farm point of interest
	*
	*/
    GetFarmSummary: function(req) {
        var farmID = req.param("farmID");
        var todaysDate = new Date().toISOString().split("T")[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object

        var futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);

        var farmData = this.GetFarmDetails(farmID, todaysDate, todaysDate);
        var weatherData = this.GetWeatherDetails(
            farmID,
            todaysDate,
            futureDate
        );

        return Promise.all([farmData, weatherData]).then(
            ([fieldResults, weatherResults]) => {
                var farmCrops = JSON.parse(fieldResults);
                var weather = JSON.parse(weatherResults);

                var today = new Date();
                today.setHours(0, 0, 0, 0);
                var currentCrops = [];
                var displayWeather = [];

                for (i in farmCrops[0]) {
                    var expectedHarvest = new Date(
                        farmCrops[0][i]["PlantDate"]
                    );
                    expectedHarvest.setDate(
                        expectedHarvest.getDate() +
                            farmCrops[0][i]["TimeToMature"]
                    );
                    var date = new Date();

                    if (expectedHarvest >= today) {
                        var crop = new cropSummaryModel(
                            farmCrops[0][i]["CropName"],
                            expectedHarvest
                        );
                        currentCrops.push(crop);
                    }
                }
                var startDate;

                var day2Date;
                var day3Date;
                var day4Date;
                var day5Date;

                for (i in weather[0]) {
                    var weatherDate = weather[0][i]["RecordDate"].split("T")[0];
                    var comparisonDate = todaysDate;

                    if (weatherDate == comparisonDate) {
                        startDate = weather[0][i]["RecordDate"];
                        var todayWeather = new weatherSummaryModel(
                            weatherDate,
                            1,
                            weather[0][i]["Season"],
                            weather[0][i]["Weathertype"],
                            weather[0][i]["Temperature"],
                            weather[0][i]["Humidity"],
                            weather[0][i]["WindStrength"]
                        );
                        displayWeather.push(todayWeather);

                        var day2 = new Date(startDate);
                        day2.setDate(day2.getDate() + 1);
                        var day3 = new Date(day2);
                        day2 = day2.toISOString().split("T")[0];
                        day2Date = day2;

                        day3.setDate(day3.getDate() + 1);
                        var day4 = new Date(day3);
                        day3 = day3.toISOString().split("T")[0];
                        day3Date = day3;

                        day4.setDate(day4.getDate() + 1);
                        var day5 = new Date(day4);
                        day4 = day4.toISOString().split("T")[0];
                        day4Date = day4;

                        day5.setDate(day5.getDate() + 1);
                        day5 = day5.toISOString().split("T")[0];
                        day5Date = day5;
                    }

                    if (String(weatherDate) == String(day2Date)) {
                        var day2Weather = new weatherSummaryModel(
                            day2Date,
                            2,
                            weather[0][i]["Season"],
                            weather[0][i]["Weathertype"],
                            weather[0][i]["Temperature"],
                            weather[0][i]["Humidity"],
                            weather[0][i]["WindStrength"]
                        );
                        displayWeather.push(day2Weather);
                    }

                    if (String(weatherDate) == String(day3Date)) {
                        var day3Weather = new weatherSummaryModel(
                            day3Date,
                            3,
                            weather[0][i]["Season"],
                            weather[0][i]["Weathertype"],
                            weather[0][i]["Temperature"],
                            weather[0][i]["Humidity"],
                            weather[0][i]["WindStrength"]
                        );
                        displayWeather.push(day3Weather);
                    }

                    if (String(weatherDate) == String(day4Date)) {
                        var day4Weather = new weatherSummaryModel(
                            day4Date,
                            4,
                            weather[0][i]["Season"],
                            weather[0][i]["Weathertype"],
                            weather[0][i]["Temperature"],
                            weather[0][i]["Humidity"],
                            weather[0][i]["WindStrength"]
                        );
                        displayWeather.push(day4Weather);
                    }

                    if (String(weatherDate) == String(day5Date)) {
                        var day5Weather = new weatherSummaryModel(
                            day5Date,
                            5,
                            weather[0][i]["Season"],
                            weather[0][i]["Weathertype"],
                            weather[0][i]["Temperature"],
                            weather[0][i]["Humidity"],
                            weather[0][i]["WindStrength"]
                        );
                        displayWeather.push(day5Weather);
                    }
                }

                var farm = new farmSummaryModel(
                    (crops = currentCrops),
                    (weather = displayWeather)
                );
                return { farmID, farm: farm };
            }
        );
    },
    /*
	*
	* Returns a JSON object with all the information used for the farm analysis
	* This is used to display the averages and totals for crops and weather information on the analysis tab on the farm point of interest
	* This is used to give an insight to the farmer the history of his crops and weather trends
	*
	*/
    GetFarmAnalysis: function(req) {
        var farmID = req.param("farmID");
        var todaysDate = new Date().toISOString().split("T")[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
        var pastDate = new Date();
        pastDate = pastDate.setMonth(pastDate.getMonth() - 6);
        pastDate = new Date(pastDate).toISOString().split("T")[0];
        var futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);
        var cropData = this.GetCropDetails();
        var fieldData = this.FindFarm(farmID, pastDate, todaysDate);
        var weatherData = this.GetWeatherDetails(farmID, pastDate, futureDate);
        return Promise.all([fieldData, weatherData, cropData]).then(
            ([fieldResults, weatherResults, cropResults]) => {
                fieldResults = JSON.parse(fieldResults);
                fieldResults = fieldResults[0];
                weatherResults = JSON.parse(weatherResults);
                weatherResults = weatherResults[0];
                cropResults = JSON.parse(cropResults);
                var months = [];
                var weatherMonths = [];

                for (var i = 0; i < 12; i++) {
                    var fields = [];

                    var noData = false;

                    for (var j = 0; j < cropResults.length; j++) {
                        var numberHarvested = 0;
                        var notHarvested = 0;
                        var avgPH = null;
                        var avgMoisture = null;
                        var record = 0;
                        for (var k = 0; k < fieldResults.length; k++) {
                            if (
                                fieldResults[k].CropName ==
                                cropResults[j].CropName
                            ) {
                                if (
                                    new Date(fieldResults[k].PlantDate)
                                        .getMonth()
                                        .toString() == String(i)
                                ) {
                                    var expectedHarvest = new Date(
                                        fieldResults[k].PlantDate
                                    );

                                    avgPH += fieldResults[k].PHLevel;

                                    avgMoisture +=
                                        fieldResults[k].MoisturePercent;

                                    record++;

                                    expectedHarvest.setDate(
                                        expectedHarvest.getDate() +
                                            fieldResults[k].TimeToMature
                                    );

                                    if (
                                        expectedHarvest.getMonth().toString() ==
                                        String(i)
                                    ) {
                                        numberHarvested++;
                                    } else {
                                        notHarvested++;
                                    }
                                }
                            }
                        }

                        if (avgPH == null && avgMoisture == null) {
                            noData = true;
                        } else {
                            avgPH = (avgPH / record).toFixed(2);
                            avgMoisture = (avgMoisture / record).toFixed(2);
                        }

                        fields.push(
                            new cropAnalysisModel(
                                cropResults[j].CropName,
                                numberHarvested,
                                notHarvested,
                                avgPH,
                                avgMoisture
                            )
                        );
                    }

                    months.push({
                        month: i,
                        fields,
                        noData
                    });

                    var avgTemp = 0;
                    var avgWind = 0;
                    var avgHumidity = 0;
                    var countRain = 0;
                    var recordCount = 0;

                    for (var j = 0; j < weatherResults.length; j++) {
                        if (
                            new Date(weatherResults[j].RecordDate)
                                .getMonth()
                                .toString() == String(i)
                        ) {
                            if (weatherResults[j].Temperature != undefined) {
                                avgTemp += weatherResults[j].Temperature;
                            }

                            if (weatherResults[j].WindStrength != undefined) {
                                avgWind += weatherResults[j].WindStrength;
                            }

                            if (weatherResults[j].Humidity != undefined) {
                                avgHumidity += weatherResults[j].Humidity;
                            }

                            if (
                                weatherResults[j].Weathertype == "Rain" ||
                                weatherResults[j].Weathertype == "Lightning"
                            ) {
                                countRain++;
                            }
                            recordCount++;
                        }
                    }

                    avgTemp = (avgTemp / recordCount).toFixed(2);
                    avgWind = (avgWind / recordCount).toFixed(2);
                    avgHumidity = (avgHumidity / recordCount).toFixed(2);

                    if (recordCount > 0) {
                        weatherMonths.push(
                            new weatherAnalysisModel(
                                i,
                                avgTemp,
                                avgWind,
                                avgHumidity,
                                countRain
                            )
                        );
                    } else {
                        weatherMonths.push(
                            new weatherAnalysisModel(
                                i,
                                "No Data",
                                "No Data",
                                "No Data",
                                "No Data"
                            )
                        );
                    }
                }
                return { farmID, months, weatherMonths };
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
    /*
    *
    *Retrieve field JSON object populated with entries from the marker table.
    *
    */
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
    /*
    *
    *Retrieve field JSON object populated with entries from using the farm analyis stored procedure.
    *
    */
    FindFarm: function(farmID, pastDate, todaysDate) {
        return new Promise(function(resolve, reject) {
            db.Connect().then(function(dbconnection) {
                dbQueries
                    .FindFarmAnalysis(
                        dbconnection,
                        farmID,
                        pastDate,
                        todaysDate
                    )
                    .then(function(result) {
                        dbconnection.end();
                        resolve(result);
                    });
            });
        });
    },
    /*
    *
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
                dbQueries
                    .FindWeather(dbconnection, farmID, todaysDate, futureDate)
                    .then(function(result) {
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
    GetCropDetails: function() {
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
