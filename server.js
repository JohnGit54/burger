var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;

var app = express();

//for static items
app.use(express.static("public"));

//parse application/x-www-form-urencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse application/json
app.use(bodyParser.json());


// handlebars items
//Set handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars" , exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars");


//import the routes and give server access to them
var routes = require("./controllers/burgers_controller");

app.use(routes);
//console.log(app);







app.listen(PORT, function(){
    // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
})


