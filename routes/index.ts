  ///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../types/DefinitelyTyped/express/express.d.ts'/>

// url to push - https://github.com/CPSC310-2015W1/IDE-A.git

import user = require('./user/user');
import parser = require('./parser/parser');

class Router {

  constructor() {
    var express = require('express');
    var router = express.Router();

    /* GET home page. */
    router.get('/', function(req, res, next) {
      var fmUrl = ('ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv');

      var tempParser = new parser.Parser();
      tempParser.connect(fmUrl);
      tempParser.parseCSVUrl("testUrl");
      tempParser.store("testStore");

      res.render('index', { title: 'Express' });
    });

    /* GET Hello World page. */
    router.get('/helloworld', function(req, res) {
      res.render('helloworld', { title: 'Hello, World' });
    });

    /* GET Userlist page. */
    router.get('/userlist', function(req, res) {
        var db = req.db;
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    });

    /* GET New User Page */
    router.get('/newuser', function(req, res) {
      res.render('newuser', { title: 'Add New User' });
    });

    /* GET Test page */
    router.get('/testpage', function(req, res) {
      var mongo = require('mongodb');
      var monk = require('monk');
      var db = monk('localhost:27017/test2');
      var collection = db.get('marketCollection');

      var name = "tempName2";
      var address = "tempAddress";
      var openHour = "tempOpenHour";
      var closeHour = "tempCloseHour";
      var tempDay = "tempDay";
      var tempMonth = "temp Month";

      collection.insert({
        "name" : name,
        "address" : address,
        "openHour" : openHour,
        "closeHour" : closeHour,
        "day" : tempDay,
        "month" : tempMonth
      }, function(err, doc) {
        if (err) {
          res.send("There was a problem adding data to the database.");
        } else {
          collection.find({},{},function(e,docs){
            res.render('testpage', { title: 'Test Title' });
          });
        }
      });
    });

    /* POST to Add User Service */
    router.post('/adduser', function(req, res) {

      // Set our internal DB variable
      var db = req.db;


      // Get our form values. These rely on the "name" attributes
      var userName = req.body.username;
      var userEmail = req.body.useremail;

      // Create a new user
      var tempUser = new user.User(userName, userEmail);

      // Set our collection
      var collection = db.get('usercollection');

      // Submit to the DB
      collection.insert({
        "username" : tempUser.getName(),
        "email" : tempUser.getEmail()
      }, function (err, doc) {
        if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database")
        } else {
          // And forward to success page
          res.redirect("userlist");
        }
      });
    });
    module.exports = router;
  }
}




var router = new Router();
