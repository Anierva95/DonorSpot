// var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const db = require("../models");
module.exports = function (app){
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.get('/login', function(request, response) {
        response.sendFile(path.join(__dirname + '/login.html'));
    });
    app.post('/auth', function(request, response) {
        var username = request.body.username;
        var password = request.body.password;
        if (username && password) {
            db.Users.findOne({
                where:{
                    username:username,
                    passwd:password
                }
            }).then(function(results) {
                if (results.dataValues.id>=1) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/');
                } else {
                    response.send('Incorrect Username and/or Password!');
                }			
                response.end();
                console.log(results.dataValues)
            });
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }
    });
}