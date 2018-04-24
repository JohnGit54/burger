
//Import the mySql connection
var connection = require("../config/connection"); // /config/connection.js");




// copied from cats ::

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// required Methods for the ORM
// selectAll()
//insertOne()
//updateOne()


var orm = {

    selectAll: function (tableInput, callback) {
        var querystring = " Select * from " + tableInput + ";";

        connection.query(querystring, function (err, result) {
            if (err) {
                console.log(" Error on selectAll: ", err);
                throw err;
            }
            callback(result);
        })
    },

    insertOne: function (table, cols, vals, callback) {
        var sql = "Insert into " + table;
        sql += " ( " + cols.toString() + " ) ";
        sql += " Values ( ?  ); ";
        //sql += " Values ( " + printQuestionMarks(vals.length) + " ); ";

        console.log(sql);

        connection.query(sql, vals, function (err, result) {
            if (err) {
                console.log(" Error with Insert: ", err);
                throw err;
            }
            //insert was succesful
            callback(result)
        })
    },

    // An example of objColVals would be {name: panther, sleepy: true}
    updateOne: function (table, objColVals, condition, callback) {

        // var x = "table: " + table + " ,objColVals: " + objColVals + " ,condition: " + condition;
        // console.log(x);
        // console.log("  objToSql(objColVals) :  " + objToSql(objColVals));
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals); 
        queryString += " WHERE ";
        queryString += condition;

        // console.log("udate query:::", queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    },

    //not using, good to keep
    updateTwo: function (sql, callback) {
        console.log(" udateTwo: ", sql);
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("Update error: " + err);
                throw err;
            }
            callback(result);
        })
    }

}

module.exports = orm;