var db = require("../config/database.js");
var dbQueries = require("../respositories/databaseFunctions.js");
var fieldModel = require("../models/fieldModel.js");
var farmSummaryModel = require("../models/farmSummaryModel.js");
var cropSummaryModel = require("../models/currentCropsSummaryModel.js");
var weatherSummaryModel = require("../models/currentWeatherSummaryModel.js");
var weatherAnalysisModel = require("../models/analysisWeatherModel");
var cropAnalysisModel = require("../models/analysisCropsModel.js");

module.exports = {
    GetAllMarkers: function() {
        var markerData = this.GetMarkers();
        return Promise.all([markerData]).then(([markerResults]) => {
            var originalMarkers = JSON.parse(markerResults);
            var markers = originalMarkers[0];
            return { markers: markers };
        });
    },

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

            //calculate growing periods - add it to final json
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
            expectedHarvest.setDate(expectedHarvest.getDate() + growthDelay); //get the number of days and then add how long it takes the plant to grow. Then convert this into a date.

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

            if (image2Date > today) {
                image = 1;
            } else if (image3Date > today) {
                image = 2;
            } else if (image4Date > today) {
                image = 3;
            } else if (expectedHarvest > today) {
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
                console.log(farmData);
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
                    console.log(farmCrops[0]);
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
                return { farm: farm };
            }
        );
    },

    GetFarmAnalysis: function(req) {
        var farmID = req.param("farmID");
        var todaysDate = new Date().toISOString().split("T")[0]; //found at https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
        var pastDate = new Date();
        pastDate = pastDate.setMonth(pastDate.getMonth() - 6);
        pastDate = new Date(pastDate).toISOString().split("T")[0];
        var futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);

        var fieldData = this.FindFarm(farmID, pastDate, todaysDate);
        var weatherData = this.GetWeatherDetails(farmID, pastDate, futureDate);
        return Promise.all([fieldData, weatherData]).then(
            ([fieldResults, weatherResults]) => {
                fieldResults = JSON.parse(fieldResults);
                fieldResults = fieldResults[0];
                weatherResults = JSON.parse(weatherResults);
                weatherResults = weatherResults[0];

                var months = [];
                var weatherMonths = [];

                for (var i = 0; i < 12; i++) {
                    var fields = [];

                    for (var j = 0; j < fieldResults.length; j++) {
                        var ready = false;

                        if (
                            new Date(fieldResults[j].PlantDate)
                                .getMonth()
                                .toString() == String(i)
                        ) {
                            ready = true;
                        }
                        fields.push(
                            new cropAnalysisModel(
                                fieldResults[j].CropName,
                                fieldResults[j].FarmFieldID,
                                ready,
                                fieldResults[j].PHLevel,
                                fieldResults[j].MoisturePercent
                            )
                        );
                    }
                    months.push({
                        month: i,
                        fields
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
                            if (i == 0) {
                                console.log(weatherResults[j].Temperature);
                            }

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
                    }
                }
                return { months, weatherMonths };
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
                        console.log(result);
                        dbconnection.end();
                        resolve(result);
                    });
            });
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
