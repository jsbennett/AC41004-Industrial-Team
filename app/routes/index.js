var express = require('express');
var router = express.Router();
var farmService = require("../services/farmService.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getField', function (req,res,next) {
    farmService.GetAllFarmDetails(res);  
});

router.get('/getFarm', function (req,res,next) {
  farmService.GetFarmDetails(res); 
}); 

router.get('/getLocation', function (req,res,next) {
  farmService.GetLocationDetails(res); 
}); 

router.get('/getWeather', function (req,res,next) {
  farmService.GetWeatherDetails(res); 
}); 

router.get('/getCrop', function (req,res,next) {
  farmService.GetCropDetails(res); 
});  

module.exports = router;
