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
        return JSON.stringify({ a : 1 }, null, 3);
    }
};