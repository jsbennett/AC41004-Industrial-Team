var express = require('express');
var router = express.Router();
var farmService = require("../services/farmService.js");

router.get('/test', function(req, res, next) {
	res.render('test', {
		title: 'Express',
		newkey: 'some text'
	});
});
router.get('/farmlocations', function(req, res, next) {
	res.send([
		{
			farmid: 1,
			name: 'Farm 1',
			lat: 56.4981776,
			long: -3.0744827,
			grown: true
		},
		{
			farmid: 2,
			name: 'Farm 2',
			lat: 56.4970665,
			long: -3.0744827,
			grown: false
		},
		{
			farmid: 3,
			name: 'Farm 3',
			lat: 56.4960554,
			long: -3.0744827,
			grown: false
		}
	]);
});

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.get('/soil', function(req, res, next) {
	res.render('soil', {
		title: 'Express',
		newkey: 'some text'
	});
});

router.get('/api/getMarkers', function (req,res,next) {
  farmService.GetAllMarkers(res);  
});

router.get('/api/getField', function (req,res,next) {
    farmService.GetAllMarkers(res);  
});

router.get('/api/getFarmSummary', function (req,res,next) {
  farmService.GetFarmDetails(res); 
}); 

router.get('/api/getFarmAnalysis', function (req,res,next) {
  farmService.GetFarmDetails(res); 
}); 

router.get('/getLocation', function (req,res,next) {
  farmService.GetLocationDetails(res); 
});  

module.exports = router;
