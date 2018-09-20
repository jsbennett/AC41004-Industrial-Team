var express = require('express');
var router = express.Router();
var farmService = require('../services/farmService.js');
//var request = require('request');

router.get('/field/:fieldID', function(req, res, next) {
	farmService.GetCurrentFieldDetails(req, res).then(function(json) {
		console.log(json);
		res.render('field', { data: json });
	});
});
 
router.get('/soil/:fieldID', function(req, res, next) {
	farmService.GetCurrentFieldDetails(req, res).then(function(json) {
		res.render('soil', { data: json });
	});
});

router.get('/farm/:farmID', function(req, res, next) {
	farmService.GetFarmSummary(req, res).then(function(json) {
		res.render('farm', { data: json });
	});
});

router.get('/farmSummary/:farmID', function(req, res, next) {
	farmService.GetFarmSummary(req, res).then(function(json) {
		res.render('summary', { data: json });
	});
});

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'FRM3D'
	});
});

router.get('/api/getField/:fieldID', function(req, res, next) {
	farmService.GetCurrentFieldDetails(req, res).then(function(json) {
		res.send(json);
	});
});

router.get('/api/getFarmSummary/:farmID', function(req, res, next) {
	farmService.GetFarmSummary(req, res).then(function(json) {
		res.send(json);
	});
});


router.get('/api/getFarmAnalysis', function(req, res, next) {
	farmService.GetFarmDetails(res).then(function(json) {
		res.send(json);
	});
});

router.get('/api/getMarkers', function(req, res, next) {
	farmService.GetAllMarkers(res).then(function(json) {
		res.send(json);
	});
});

module.exports = router;
