var express = require('express');
var router = express.Router();
var db = require('../config/database.js');

/*
*
*Retrieve field JSON object populated with entries from the field table.
*
*/
function GetFieldDetails(res){
  var dbConnection = db.Connect(); 
  var json = db.FindField(dbConnection); 
  res.send(json);
};

/*
*
*Retrieve farm JSON object populated with entries from the farm table.
*
*/
function GetFarmDetails(res){
  var dbConnection = db.Connect(); 
  var json = db.FindFarm(dbConnection); 
  res.send(json);
};

/*
*
*Retrieve location JSON object populated with entries from the location table.
*
*/
function GetLocationDetails(res){
  var dbConnection = db.Connect(); 
  var json = db.FindLocation(dbConnection); 
  res.send(json);
};

/*
*
*Retrieve weather JSON object populated with entries from the weather table.
*
*/
function GetWeatherDetails(res){
  var dbConnection = db.Connect(); 
  var json = db.FindWeather(dbConnection); 
  res.send(json);
};

/*
*
*Retrieve crop JSON object populated with entries from the crop table.
*
*/
function GetCropDetails(res){
  var dbConnection = db.Connect(); 
  var json = db.FindCrop(dbConnection); 
  res.send(json);
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getField', function (req,res,next) {
        GetFieldDetails(res); 
});

router.get('/getFarm', function (req,res,next) {
        GetFarmDetails(res); 
}); 

router.get('/getLocation', function (req,res,next) {
        GetLocationDetails(res); 
}); 

router.get('/getWeather', function (req,res,next) {
        GetWeatherDetails(res); 
}); 

router.get('/getCrop', function (req,res,next) {
        GetCropDetails(res); 
});  

module.exports = router;
