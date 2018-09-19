var express = require('express');
var router = express.Router();
var farmService = require("../services/farmService.js")
//
router.get('/field', function(req, res, next) {
	res.render('field');
});

router.get('/farm', function(req, res, next) {
	res.render('farm');
});

router.get('/soil', function(req, res, next) {
	res.render('soil');
});

router.get('/summary/:farmID', function(req, res, next) {
	farmService.GetCurrentFieldDetails(req, res).then(function(json) {
		res.render('farm', { data: json });
	});
});

router.get('/api/getFarmSummary/:farmID', function(req, res, next) {
	farmService.GetFarmSummary(req, res).then(function(json) {
		res.json(json);
	});
});

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'FRM3D'
	});
});

module.exports = router;
