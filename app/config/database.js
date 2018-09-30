/*
*
*The purpose of this is to connect to the database using the config file which has the connect details
*
*/

var config = require("../config/config.js");
module.exports = {
    /*
	*
	*This function is used to connect to the database 
	*
	*/
    Connect: function() {
        return new Promise(function(resolve, reject) {
            var mysql = require("mysql");
            //use the connection defined in the conifg file
            var dbConnection = mysql.createConnection(config.database);
            dbConnection.connect(function(err) {
                if (err) throw err;
            });
            resolve(dbConnection);
        });
    }
};
