var config = require('../config/config.js');
module.exports = {
	Connect: function() {
		return new Promise(function(resolve, reject) {
			var mysql = require('mysql');
			var dbConnection = mysql.createConnection({
				host: 'acapper.duckdns.org',
				user: 'WebApplication',
				password: 'DatabasePassword123',
				database: 'IndustrialProject'
			});
			dbConnection.connect(function(err) {
				if (err) throw err;
				//console.log("Successfully connected to db");
			});
			resolve(dbConnection);
		});
	}
};
