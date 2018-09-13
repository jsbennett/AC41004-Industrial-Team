var db = require('../config/database.js');
var dbQueries = require("../respositories/databaseFunctions.js")

/*
*
*Retrieve field JSON object populated with entries from the field table.
*
*/
function GetFieldDetails(res){
    db.Connect(function(dbConnection){
        dbQueries.FindField(dbConnection, function(result){
          res.send(result);
        }); 
    });
};