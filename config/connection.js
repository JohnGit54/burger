
//set up mySql connection to Burger_db

var mysql = require('mysql');


var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "burgers_db"
})


connection.connect(function (err) {
    if (err) {
        console.log("Error on connecting: ", err);
        console.log("Error Stack, ", err.stack);
        return;
    }

    //connection good here
    console.log(" connected as id: " , connection.threadId);
})


//export the connection for our ORM to use
module.exports = connection;
