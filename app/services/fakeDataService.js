var db = require('../config/database.js');
var dbQueries = require('../respositories/databaseInsertFunctions.js');

module.exports = {
	InsertWeather: function(data) {
		db.Connect().then(function(dbconnection) {
			dbQueries.InsertWeather(dbconnection, data);
			dbconnection.end();
		});
	},

	InsertFarmField: function(data) {
		db.Connect().then(function(dbconnection) {
			dbQueries.InsertFarmField(dbconnection, data);
			dbconnection.end();
		});
	}
};
