module.exports = {
    FindMarkers: function(dbConnection) {
        return new Promise(function(resolve, reject) {
            dbConnection.query("CALL AllMarkers()", function(err, recordset) {
                if (err) console.log(err);
                resolve(JSON.stringify(recordset));
            });
        });
    },
    /*
    *
    *Extracts all entries from the fields table and returns them as a single JSON object.
    *    
    */
    FindField: function(dbConnection, fieldID, startDate, endDate) {
        return new Promise(function(resolve, reject) {
            dbConnection.query(
                "CALL GetDailyFarmFieldsDetails(?, ?, ?)",
                [fieldID, startDate, endDate],
                function(err, recordset) {
                    console.log(recordset);
                    if (err) console.log(err);
                    resolve(JSON.stringify(recordset));
                }
            );
        });
    },
    /*
    *
    *Extracts all entries from the farm table and returns them as a single JSON object.
    *    
    */
    FindFarmAnalysis: function(dbConnection, farmID, startDate, endDate) {
        return new Promise(function(resolve, reject) {
            console.log(farmID, startDate, endDate);
            dbConnection.query(
                "CALL FarmSummary(?, ?, ?)",
                [farmID, startDate, endDate],
                function(err, recordset) {
                    if (err) console.log(err);
                    resolve(JSON.stringify(recordset));
                }
            );
        });
    },
    /*
    *
    *Extracts all entries from the farm table and returns them as a single JSON object.
    *    
    */
    FindFarm: function(dbConnection, farmID, startDate, endDate) {
        return new Promise(function(resolve, reject) {
            dbConnection.query(
                "CALL FarmAnalysisData(?, ?, ?)",
                [farmID, startDate, endDate],
                function(err, recordset) {
                    if (err) console.log(err);
                    resolve(JSON.stringify(recordset));
                }
            );
        });
    },
    /*
    *
    *Extracts all entries from the farm table and returns them as a single JSON object.
    *    
    */
    /* FindFarm: function(dbConnection, farmID, startDate, endDate) {
	return new Promise(function(resolve, reject) {
		var query = 'CALL  FarmAnalysisData(' +farmID+','+startDate+','+endDate+')';
		console.log(query);
		dbConnection.query(
			query,
			function(err, recordset) {
				if (err) console.log(err);
				resolve(JSON.stringify(recordset));
			}
		);
	});
},*/
    /*
    *
    *Extracts all entries from the crops table and returns them as a single JSON object.
    *    
    */
    FindCrop: function(dbConnection) {
        return new Promise(function(resolve, reject) {
            dbConnection.query("SELECT * FROM IndustrialProject.Crop", function(
                err,
                recordset
            ) {
                if (err) console.log(err);
                resolve(JSON.stringify(recordset));
            });
        });
    },
    /*
    *
    *Extracts all entries from the location table and returns them as a single JSON object.
    *    
    */
    FindLocation: function(dbConnection) {
        return new Promise(function(resolve, reject) {
            dbConnection.query(
                "SELECT * FROM IndustrialProject.Location",
                function(err, recordset) {
                    if (err) console.log(err);
                    resolve(JSON.stringify(recordset));
                }
            );
        });
    },
    /*
    *
    *Extracts all entries from the weather table and returns them as a single JSON object.
    *    
    */
    FindWeather: function(dbConnection, farmID, startDate, endDate) {
        return new Promise(function(resolve, reject) {
            dbConnection.query(
                "CALL GetDailyWeatherDetails(?, ?, ?)",
                [farmID, startDate, endDate],
                function(err, recordset) {
                    if (err) console.log(err);
                    resolve(JSON.stringify(recordset));
                }
            );
        });
    }
};
