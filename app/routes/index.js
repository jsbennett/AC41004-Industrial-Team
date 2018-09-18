var express = require('express');
var router = express.Router();

router.get('/field', function(req, res, next) {
	res.render('field');
});

router.get('/farm', function(req, res, next) {
	res.render('farm');
});

router.get('/soil', function(req, res, next) {
	res.render('soil');
});

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'FRM3D'
	});
});

module.exports = router;
