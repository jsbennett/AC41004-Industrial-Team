module.exports = {


    Connect : function(){
        var mysql = require('mysql');
        var dbConnection = mysql.createConnection({
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
    var sql = require('mysql');
   var dbConnection = sql.createConnection({
            host: "acapper.duckdns.org",
            user: "WebApplication",
            password: "DatabasePassword123"
            }); 
    dbConnection.query('SELECT * FROM IndustrialProject.Farmfield', function(err,recordset){
    if(err) console.log(err);
    console.log("Success");
    console.log(JSON.stringify(recordset));
    result = JSON.stringify(recordset);});

    

        //return JSON.stringify({ a : 1 }, null, 3);
    }
};