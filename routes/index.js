var express = require('express');
var router = express.Router();
var db = require('../config/database.js');

function GetFieldDetails(res) {
	var dbConnection = db.Connect();
	var json = db.FindField(dbConnection);
	res.send(json);
}

router.get('/getField', function(req, res, next) {
	GetFieldDetails(res);
});

router.get('/test', function(req, res, next) {
	res.render('test', {
		title: 'Express',
		newkey: 'some text'
	});
});
router.get('/farmlocations', function(req, res, next) {
	res.send([
			 { farmid: 1, name: 'Farm 1', lat: 56.4981776, long: -3.0744827 },
			 { farmid: 2, name: 'Farm 2', lat: 56.4970665, long: -3.0744827 },
			 { farmid: 3, name: 'Farm 3', lat: 56.4960554, long: -3.0744827 }
		 	 ])
});

router.get('/', function(req, res, next) {
	res.render('index', {
	 title: 'Express',
	});
});

module.exports = router;
