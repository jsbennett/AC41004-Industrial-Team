module.exports = {

    Connect : function(){
        global.mysql = require('mysql');
        global.dbConnection = mysql.createConnection({
            host: "acapper.duckdns.org",
            user: "WebApplication",
            password: "DatabasePassword123"
            }); 
        dbConnection.connect(function(err) {
            if (err) throw err;
                console.log("Successfully connected to db");
                return dbConnection; 
            });    
    },
/*
    *
    *Extracts all entries from the fields table and returns them as a single JSON object.
    *    
*/
    FindField : function(temp)
    {
    var result;
    dbConnection.query('SELECT * FROM IndustrialProject.Farmfield', function(err,recordset){
    if(err) console.log(err);
    return JSON.stringify(recordset);});
    },
/*
    *
    *Extracts all entries from the farm table and returns them as a single JSON object.
    *    
*/
    FindFarm : function(temp)
    {
    var result;
    dbConnection.query('SELECT * FROM IndustrialProject.Farm', function(err,recordset){
    if(err) console.log(err);
    return JSON.stringify(recordset);});
    },
/*
    *
    *Extracts all entries from the crops table and returns them as a single JSON object.
    *    
*/
    FindCrop : function(temp)
    {
    var result;
    dbConnection.query('SELECT * FROM IndustrialProject.Crop', function(err,recordset){
    if(err) console.log(err);
    return JSON.stringify(recordset);});
    },
/*
    *
    *Extracts all entries from the location table and returns them as a single JSON object.
    *    
*/
    FindLocation : function(temp)
    {
    var result;
    dbConnection.query('SELECT * FROM IndustrialProject.Location', function(err,recordset){
    if(err) console.log(err);
    return JSON.stringify(recordset);});
    },
/*
    *
    *Extracts all entries from the weather table and returns them as a single JSON object.
    *    
*/
    FindWeather : function(temp)
    {
    var result;
    dbConnection.query('SELECT * FROM IndustrialProject.Weather', function(err,recordset){
    if(err) console.log(err);
    return JSON.stringify(recordset);});
    }



};