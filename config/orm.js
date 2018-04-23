
//Import the mySql connection
var connection = require("../config/connection"); // /config/connection.js");



// required Methods for the ORM
// selectAll()
//insertOne()
//updateOne()


var orm = {

    selectAll: function (tableInput, callback) {
        var querystring = " Select * from " + tableInput + ";";

        connection.query(querystring,function(err,result){
            if (err){
                console.log (" Error on selectAll: ", err);
                throw err;
            }
            callback(result);
        })
    }




}
