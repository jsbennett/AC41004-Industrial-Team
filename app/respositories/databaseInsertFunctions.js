module.exports = {
	InsertWeather: function(dbc, data) {
		return new Promise(function(resolve, reject) {
			var query =
				'call InsertWeather(' +
				dbc.escape(data.date) +
				',' +
				dbc.escape(data.season) +
				',' +
				dbc.escape(data.temperature) +
				',' +
				dbc.escape(data.weather) +
				',' +
				dbc.escape(data.humidity) +
				',' +
				dbc.escape(data.windStrength) +
				',' +
				dbc.escape(data.id) +
				',' +
				dbc.escape(data.time) +
				')';
			dbc.query(query, function(err) {
				if (err) console.log(err);
			});
		});
	}
};
