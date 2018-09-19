var express = require('express');
var router = express.Router();
var db = require('../config/database.js');
var config = require('../config/config.js');
var mysql = require('mysql');

router.get('/addFarmData', function(req, res) {
	let connection = mysql.createConnection(config.database);
	connection.connect(function(err) {
		if (err) throw err;
		console.log('Successfully connected to db');

		let sql = `CALL FarmfieldInsert(?, ?, ?, ?, ?, ?)`;

		let data = {
			farmid: 1,
			ph: 1,
			soil: 69,
			crop: 1,
			locationid: 1,
			cropdate: '2019-09-13'
		};
		//(farmid int(11), ph int(11), soil int(11), cropid int(11), locationid int(11), cropdate date)
		connection.query(
			sql,
			[
				data.farmid,
				data.ph,
				data.soil,
				data.crop,
				data.locationid,
				data.cropdate
			],
			(error, results, fields) => {
				if (error) {
					return console.error(error.message);
				}
				console.log('Insert successful');
			}
		);

		connection.end();
	});
	res.send('got here');
});

module.exports = router;
