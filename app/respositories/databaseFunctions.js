
module.exports = {

    /*
    *
    *Extracts all entries from the fields table and returns them as a single JSON object.
    *    
    */
    
    FindField : function(dbConnection, callback)
    {
        dbConnection.query('SELECT * FROM IndustrialProject.Farmfield', function(err,recordset){
        if(err) console.log(err);
            callback(JSON.stringify(recordset));
        });
    },
    /*
    *
    *Extracts all entries from the farm table and returns them as a single JSON object.
    *    
    */
    FindFarm : function()
    {
        dbConnection.query('SELECT * FROM IndustrialProject.Farm', function(err,recordset){
            if(err) console.log(err);
            callback(JSON.stringify(recordset));
        });
    },
    /*
    *
    *Extracts all entries from the crops table and returns them as a single JSON object.
    *    
    */
    FindCrop : function()
    {
        dbConnection.query('SELECT * FROM IndustrialProject.Crop', function(err,recordset){
            if(err) console.log(err);
            callback(JSON.stringify(recordset));
        });
    },
    /*
    *
    *Extracts all entries from the location table and returns them as a single JSON object.
    *    
    */
    FindLocation : function()
    {
        var result;
        dbConnection.query('SELECT * FROM IndustrialProject.Location', function(err,recordset){
            if(err) console.log(err);
            callback(JSON.stringify(recordset));
        });
    },
    /*
    *
    *Extracts all entries from the weather table and returns them as a single JSON object.
    *    
    */
    FindWeather : function()
    {
        dbConnection.query('SELECT * FROM IndustrialProject.Weather', function(err,recordset){
            if(err) console.log(err);
            callback(JSON.stringify(recordset));
        });
    }

};