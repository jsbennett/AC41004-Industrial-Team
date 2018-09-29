var db = require('../config/database.js');
var dbQueries = require('../respositories/databaseInsertFunctions.js');

module.exports = {
	//Insert weather to database
	InsertWeather: function(data) {
		db.Connect().then(function(dbconnection) {
			dbQueries.InsertWeather(dbconnection, data);
			dbconnection.end();
		});
	},

	//Insert farm field to database
	InsertFarmField: function(data) {
		db.Connect().then(function(dbconnection) {
			dbQueries.InsertFarmField(dbconnection, data);
			dbconnection.end();
		});
	}
};
