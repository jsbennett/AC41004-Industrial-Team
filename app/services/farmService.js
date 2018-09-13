var db = require('../config/database.js');
var dbQueries = require("../respositories/databaseFunctions.js")

module.exports = {

    /*
    *
    * Retrieves all the details for the farm and puts then into one JSON
    * 
    */
    GetAllFarmDetails : function(res){
        
    },

    /*
    *
    *Retrieve field JSON object populated with entries from the field table.
    *
    */
    GetFieldDetails : function(res){
        db.Connect(function(dbConnection){
            dbQueries.FindField(dbConnection, function(result){
            res.send(result);
            }); 
        });
    },

    /*
    *
    *Retrieve farm JSON object populated with entries from the farm table.
    *
    */
    GetFarmDetails: function(res){
        db.Connect(function(dbConnection){
            dbQueries.FindFarm(dbConnection, function(result){
                res.send(result);
            }); 
        });
        
    },
    
    /*
    *
    *Retrieve location JSON object populated with entries from the location table.
    *
    */
    GetLocationDetails: function(res){
        db.Connect(function(dbConnection){
            dbQueries.FindLocation(dbConnection, function(result){
                res.send(result);
            }); 
        });
    },
    
    /*
    *
    *Retrieve weather JSON object populated with entries from the weather table.
    *
    */
    GetWeatherDetails: function(res){
        db.Connect(function(dbConnection){
            dbQueries.FindWeather(dbConnection, function(result){
                res.send(result);
            }); 
        });
    },
    
    /*
    *
    *Retrieve crop JSON object populated with entries from the crop table.
    *
    */
    GetCropDetails: function(res){
        db.Connect(function(dbConnection){
            dbQueries.FindCrop(dbConnection, function(result){
                res.send(result);
            }); 
        });
    }
};