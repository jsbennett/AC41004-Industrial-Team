/*
*
*Name: Index.js
*Purpose: This is used to define the routes for the front end and for the API
*
*
*/

var express = require("express");
var router = express.Router();
var farmService = require("../services/farmService.js");

/*
*
*This section is the routes used by the front end to get the JSON information
*
*/

/*
*
*This function is used to get a the crop informatin for a single field using the field id
*
*/
router.get("/field/:fieldID", function(req, res, next) {
    farmService.GetCurrentFieldDetails(req).then(function(json) {
        res.render("field", { data: json });
    });
});

/*
*
*This function is used to get a the soil information for  single field using the field id
*
*/
router.get("/soil/:fieldID", function(req, res, next) {
    farmService.GetCurrentFieldDetails(req).then(function(json) {
        res.render("soil", { data: json });
    });
});

/*
*
*This function is used to get a farm information using a  farm id
*
*/
router.get("/farm/:farmID", function(req, res, next) {
    farmService.GetFarmSummary(req).then(function(json) {
        res.render("farm", { data: json });
    });
});

/*
*
*This function is used to get a farm summamry information for a single farm using a farm
*
*/
router.get("/farmSummary/:farmID", function(req, res, next) {
    farmService.GetFarmSummary(req).then(function(json) {
        res.render("summary", { data: json });
    });
});

/*
*
*This function is used to get a a single farms weather analysis information using a farm id 
*
*/
router.get("/weatherAnalysis/:farmID", function(req, res, next) {
    farmService.GetFarmAnalysis(req).then(function(json) {
        res.render("weatherAnalysis", { data: json });
    });
});

/*
*
*This function is used to get a single farms crop analysis using a farm id 
*
*/
router.get("/cropAnalysis/:farmID", function(req, res, next) {
    farmService.GetFarmAnalysis(req).then(function(json) {
        res.render("cropAnalysis", { data: json });
    });
});

/*
*
*This function is used to get a single farms crop information using a farm id 
*
*/
router.get("/plantAnalysis/:farmID", function(req, res, next) {
    farmService.GetPlantData(req).then(function(json) {
        res.render("cropAnalysis", { data: json });
    });
});

/*
*
*This function is used to get a single farms weather summary information using a farm id
*
*/
router.get("/dailyWeatherAnalysis/:farmID", function(req, res, next) {
    farmService.GetDailyWeatherData(req).then(function(json) {
        res.render("weatherAnalysis", { data: json });
    });
});

/*
*
*This function is used to navigate to the route page which will display the map 
*
*/
router.get("/", function(req, res, next) {
    res.render("index", {
        title: "FRM3D"
    });
});

/*
*
*This section is the api rouotes - used to view the information fetched for each of the routes 
*
*/

/*
*
*This function is used to get a single fields information using the field id
* e.g. if when runnning the application, you go to http://localhost:3000/api/getField/1
* it will output the json of the information returned  
*
*/
router.get("/api/getField/:fieldID", function(req, res, next) {
    farmService.GetCurrentFieldDetails(req).then(function(json) {
        res.send(json);
    });
});

/*
*
*This function is used to get a single farm summary using the farm id
* e.g. if when runnning the application, you go to http://localhost:3000/api/getFarmSummary/1
* it will output the json of the information returned  
*
*/
router.get("/api/getFarmSummary/:farmID", function(req, res, next) {
    farmService.GetFarmSummary(req).then(function(json) {
        res.send(json);
    });
});

/*
*
*This function is used to get a single farm analysis using the farm id
* e.g. if when runnning the application you go to http://localhost:3000/api/getFarmAnalysis/1
* it will output the json of the information returned  
*
*/
router.get("/api/getFarmAnalysis/:farmID", function(req, res, next) {
    farmService.GetFarmAnalysis(req).then(function(json) {
        res.send(json);
    });
});

/*
*
*This function is used to get a all the fields and farms and their locations
* e.g. if when runnning the application you go to http://localhost:3000/api/getMarkers
* it will output the json of the information returned  
*
*/
router.get("/api/getMarkers", function(req, res, next) {
    farmService.GetAllMarkers().then(function(json) {
        res.send(json);
    });
});

/*
*
*This function is used to get a single farms plant information using the farm id
* e.g. if when runnning the application you go to http://localhost:3000/api/getPlantData/1
* it will output the json of the information returned  
*
*/
router.get("/api/getPlantData/:farmID", function(req, res, next) {
    farmService.GetPlantData(req).then(function(json) {
        res.send(json);
    });
});

/*
*
*This function is used to get a single farms weather information using the farm id
* e.g. if when runnning the application you go to http://localhost:3000/api/getDailyWeather/1
* it will output the json of the information returned  
*
*/
router.get("/api/getDailyWeather/:farmID", function(req, res, next) {
    farmService.GetDailyWeatherData(req).then(function(json) {
        res.send(json);
    });
});

module.exports = router;
