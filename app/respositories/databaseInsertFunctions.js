module.exports = {
	InsertWeather: function(dbc, forecast) {
		return new Promise(function(resolve, reject) {
			for (var i = 0; i < forecast.length; i++) {
				var data = forecast[i];
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
			}
		});
	},

	InsertFarmField: function(dbc, data) {
		return new Promise(function(resolve, reject) {
			var query =
				'call InsertField(' +
				dbc.escape(data.id) +
				',' +
				dbc.escape(data.phLevel) +
				',' +
				dbc.escape(data.moisturePercent) +
				',' +
				dbc.escape(data.cropID) +
				',' +
				dbc.escape(data.location) +
				',' +
				dbc.escape(data.plantDate) +
				',' +
				dbc.escape(data.recordDate) +
				',' +
				dbc.escape(data.recordTime) +
				')';
			dbc.query(query, function(err) {
				if (err) console.log(err);
			});
		});
	}
};
