/*
*
*databaseFunctions - the purpose of this file is to collectibly store all the functions used to query the database. 
*
*/

module.exports = {
    /*
	*
	*Extracts all the markers from the marker table which is used to display the points of interest on the map and returns them as a single JSON object
	*This function uses the stored procedure used to get all the markers
	*
	*/
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
	*Extracts a single field from the fields table and returns it as a single JSON object.
	*This function uses the stored procedure used to get the daily field information.
	*This function uses the field id, and two dates to find the relevant information.
    *    
    */
    FindField: function(dbConnection, fieldID, startDate, endDate) {
        return new Promise(function(resolve, reject) {
            dbConnection.query(
                "CALL GetDailyFarmFieldsDetails(?, ?, ?)",
                [fieldID, startDate, endDate],
                function(err, recordset) {
                    if (err) console.log(err);
                    resolve(JSON.stringify(recordset));
                }
            );
        });
    },
    /*
    *
	*Extracts information about a single farm to be used in the summary and returns them as a single JSON object.
	*This function uses the stored procedure used to get the farm summary information.
	*This function uses the farm id, and two dates to find the relevant information.
    *    
    */
    FindFarmAnalysis: function(dbConnection, farmID, startDate, endDate) {
        return new Promise(function(resolve, reject) {
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
	*Extracts information to be analysed about a single farm for the crop anaysis and returns them as a single JSON object.
	*This function uses the stored procedure used to get the farm analysis information.
	*This function uses the farm id, and two dates to find the relevant information.
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
	*Extracts information about the weather for a single farm and returns them as a single JSON object.
	*This function uses the stored procedure used to get the weather information.
	*This function uses the farm id, and two dates to find the relevant information.
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
