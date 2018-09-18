var express = require('express');
var router = express.Router();
var farmService = require('../services/farmService.js');

router.get('/getMarkers', function(req, res, next) {
	farmService.GetAllMarkers().then(function(data) {
		res.json(data);
	});
});

router.get('/getField', function(req, res, next) {
	farmService.GetAllMarkers(res);
});

router.get('/getFarmSummary', function(req, res, next) {
	farmService.GetFarmDetails(res);
});

router.get('/getFarmAnalysis', function(req, res, next) {
	farmService.GetFarmDetails(res);
});

module.exports = router;
