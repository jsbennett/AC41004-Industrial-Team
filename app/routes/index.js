var express = require('express');
var router = express.Router();
var farmService = require('../services/farmService.js');

router.get('/field', function(req, res, next) {
	res.render('field');
});

router.get('/farm', function(req, res, next) {
	res.render('farm');
});

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'FRM3D'
	});
});

router.get('/soil', function(req, res, next) {
	res.render('soil');
});

<<<<<<< HEAD
router.get('/api/getMarkers', function(req, res, next) {
	farmService.GetAllMarkers(res);
});

router.get('/api/getField', function(req, res, next) {
	farmService.GetAllMarkers(res);
});
=======
router.get('/api/getField/:fieldID', function (req,res,next) {
    farmService.GetCurrentFieldDetails(req, res);  
});

router.get('/api/getFarmSummary/:farmID', function (req,res,next) {
  farmService.GetFarmSummary(req, res); 
}); 
>>>>>>> repo-service-layer

router.get('/api/getFarmSummary', function(req, res, next) {
	farmService.GetFarmDetails(res);
});

router.get('/api/getFarmAnalysis', function(req, res, next) {
	farmService.GetFarmDetails(res);
});

router.get('/getLocation', function(req, res, next) {
	farmService.GetLocationDetails(res);
});

module.exports = router;
