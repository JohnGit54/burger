//burger table model

//import the ORM to create function that wil interact with teh database

var orm = require("../config/orm.js");
///////////import orm from "../config/orm.js";

var burger = {

    selectAll: function (callback) {
        orm.selectAll("burgers", function (result) {
            callback(result);
        })
    },

    insertOne: function (cols, vals, callback) {
        orm.insertOne("burgers", cols, vals, function (result) {
            callback(result);
        })
    },

    updateOne: function ( tablename, objColVals, condition, callback) {
        orm.updateOne( tablename, objColVals, condition, function (result) {
            callback(result);
        })
    }  //,

    // updateTwo: function ( sql, callback) {
    //     orm.updateTwo( sql, function (result) {
    //         callback(result);
    //     })
    // }


}

module.exports = burger;
////export default burger;