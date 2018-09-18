var express = require('express');
var router = express.Router();
var farmService = require('../services/farmService.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/api/getMarkers', function(req, res, next) {
	farmService.GetAllMarkers(res);
});

router.get('/api/getField', function(req, res, next) {
	farmService.GetAllMarkers(res);
});

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
