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

router.get('/summary', function(req, res, next) {
	res.render('summary');
});

router.get('/api/getFarmSummary:FarmID', function(req, res, next) {
	farmService.GetFarmSummary(req, res);
});

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'FRM3D'
	});
});

module.exports = router;
