var express = require('express');
var router = express.Router();
var db = require("../config/database.js");

function GetFieldDetails(res){
  var dbConnection = db.Connect(); 
  var json = db.FindField(dbConnection); 
  res.send(json);
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getField', function (req,res,next) {
        GetFieldDetails(res); 
}); 

module.exports = router;
