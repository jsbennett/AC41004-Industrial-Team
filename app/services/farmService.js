var db = require('../config/database.js');
var dbQueries = require("../respositories/databaseFunctions.js")

module.exports = {

    /*
    *
    * Retrieves all the details for the farm and puts then into one JSON
    * 
    */
    GetAllFarmDetails : function(res){
        var field = this.GetFieldDetails(); 
        var farm = this.GetFarmDetails();
    return Promise.all([field, farm])
       .then(([fieldResult,farmResult]) => {
         console.log({fieldResult,farmResult}); //its being displayed like a string but not actually sent like a string!!!!! console confirms this!
        return res.json({fieldResult, farmResult});
       });
       /*var t = [{id : 1, data : {data:'2', array:}},{id : 2},{id : 3}]*/
       // t[0]['id']
       // t[1]
       // t[0]['data']['data']
        //this.GetFarmDetails().then(function(result){

           // res.send(result);
        //});
    },

    /*
    *
    *Retrieve field JSON object populated with entries from the field table.
    *
    */
    GetFieldDetails : function(){
       return new Promise(function(resolve, reject){
            db.Connect().then(function(dbconnection)
            { 
                dbQueries.FindField(dbconnection).then(function(result){
                    data = result; 
                    //console.log(result);
                    resolve(result);
                });
            }); 
        });
        //db.Connect(function(dbConnection){
            //dbQueries.FindField(dbConnection, function(result){
            //j = result;
                //res.send(result);
            //}); 
        //});
    },

    /*
    
    *Retrieve farm JSON object populated with entries from the farm table.
    *
    */
    GetFarmDetails: function(res){
        return new Promise(function(resolve, reject){
            db.Connect().then(function(dbconnection)
            { 
                dbQueries.FindFarm(dbconnection).then(function(result){
                    data = result; 
                    //console.log(result);
                    resolve(result);
                });
            }); 
        });
        //db.Connect(function(dbConnection){
           // dbQueries.FindFarm(dbConnection, function(result){
               //res.send(result);
            //}); 
        //});
        
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