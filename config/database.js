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
    
    FindField : function(temp)
    {
    var result;
    dbConnection.query('SELECT * FROM IndustrialProject.Farmfield', function(err,recordset){
    if(err) console.log(err);
    return JSON.stringify(recordset);});
    },

     FindFarm : function(temp)
    {
    var result;
    dbConnection.query('SELECT * FROM IndustrialProject.Farm', function(err,recordset){
    if(err) console.log(err);
    return JSON.stringify(recordset);});
    },

    FindCrop : function(temp)
    {
    var result;
    dbConnection.query('SELECT * FROM IndustrialProject.Crop', function(err,recordset){
    if(err) console.log(err);
    return JSON.stringify(recordset);});
    },

    FindLocation : function(temp)
    {
    var result;
    dbConnection.query('SELECT * FROM IndustrialProject.Location', function(err,recordset){
    if(err) console.log(err);
    return JSON.stringify(recordset);});
    },

    FindWeather : function(temp)
    {
    var result;
    dbConnection.query('SELECT * FROM IndustrialProject.Weather', function(err,recordset){
    if(err) console.log(err);
    return JSON.stringify(recordset);});
    }



};