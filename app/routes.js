var db = require("../config/database.js");
function getFieldDetails(res){
    //connect to database
    //return the data for that field for that farm.
    db.ConnectToDatabase(); 
    res.json({"message": "This is a field"});
};

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.get('/getField', function (req,res) {
        getFieldDetails(res); 
    }); 
};
