var config = require("../config/config.js")

module.exports = {
 
    Connect : function(callback){
        var mysql = require('mysql');
        var dbConnection = mysql.createConnection({
            host: "acapper.duckdns.org",
            user: "WebApplication",
            password: "DatabasePassword123"
            }); 
       dbConnection.connect(function(err) {
            if (err) throw err;
            callback(dbConnection);
                console.log("Successfully connected to db");
            }); 
        return dbConnection;    
    }
};