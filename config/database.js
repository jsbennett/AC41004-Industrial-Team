module.exports = {
ConnectToDatabase : function(){
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "acapper.duckdns.org",
        user: "WebApplication",
        password: "DatabasePassword123"
        }); 

    con.connect(function(err) {
        if (err) throw err;
            console.log("Connected!");
        });
    }
};
