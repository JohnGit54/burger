//import express from "express";
var express = require("express");


var router = express.Router();

//import burger model
var burger = require("../models/burger");



//create the routes get - put post

router.get("/", function (request, response) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };

        //get all burger logic
        console.log(data);

        //render 
        response.render("index", hbsObject);
    })
})



router.post("/api/burgers", function (request, response) {
    //insert new burger
    // burger.insertOne(["burgername", "devoured"],
    // [request.body.burgername, request.body.devoured], function (result) {
    console.log(" in router post");
    var newB = request.body.burgername.trim();

    console.log('burger_controller post, insert new burgername:  ', newB);

    burger.insertOne("burger_name", newB, function (result) {
        console.log(result);
        response.redirect('/');
    })
})

//router.put("/api/burgers/:burger", function (request, response) {
router.post("/api/burgers/:burger", function (request, response) {
    var condition = " id = " + request.params.burger;
    var colValue = " devoured = 1 ";


    var x = " router post for update one\n Values being passed into orm\n ";
    x += "first -sending in string 'burgers' , second colValue: " + colValue;
    x += " , third is condition: " + condition + " fourth is the callback\n";
    console.log(x);


    //put update logic
    //burger.updateOne("burgers", { "devoured": 1 }, condition, function(result){
    burger.updateOne("burgers", colValue, condition, function (result) {
        response.redirect('/');
    })
})

//expor routes for server.js to use

module.exports = router;