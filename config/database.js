module.exports = {
ConnectToDatabase : function(){
    var dbConnection = mysql.createConnection({
        host: "acapper.duckdns.org",
        user: "WebApplication",
        password: "DatabasePassword123"
        }); 

        dbConnection.connect(function(err) {
        if (err) throw err;
            console.log("Successfully connected to db");
        });
    }
};
