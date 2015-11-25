///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../types/DefinitelyTyped/express/express.d.ts'/>
// ///<reference path='./foodmarket/FoodMarket'/>

// url to push - https://github.com/CPSC310-2015W1/IDE-A.git

import user = require('./user/user');
import parser = require('./parser/parser');
import foodmarket = require('./foodmarket/FoodMarket');
//import fmf = require(./foodmarket/foodmarketfactory);
var stormpath = require('express-stormpath');


class Router {

  constructor() {
    var express = require('express');
    var router = express.Router();

    /* GET home page. */
    router.get('/', function(req, res, next) {
      var fmUrl = ('ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv');

      var tempParser = new parser.Parser();
      tempParser.connect(fmUrl);
      //tempParser.parseCsvUrl("testUrl");
      tempParser.store("testStore");

      res.render('index', { title: 'Food Market Locator' });
    });

    /* GET Hello World page. */
    router.get('/helloworld', function(req, res) {
      res.render('helloworld', { title: 'Hello, World' });
    });
	    /* GET MarketEvents page. */
    router.get('/marketevents', function(req, res) {
      res.render('marketevents', { title: 'Market Events' });
    });
		    /* GET Calendar page. */
    router.get('/calendar', function(req, res) {
      res.render('calendar', { title: 'Calendar', userData: req.user.customData.favs});
    });
	router.get('/addFavourite', stormpath.loginRequired, function (req, res) {
	  // You can add fields
	  if (typeof(req.user.customData.favs) == 'undefined'){req.user.customData.favs[0] = req.param('market');}
	  else{req.user.customData.favs[req.user.customData.favs.length] = req.param('market');}
	  req.user.customData.save();

	  req.user.customData.save(function (err) {
		if (err) {
		  res.status(400).end('Oops!  There was an error: ' + err.userMessage);
		}else{
		  res.end('Custom data was saved!');}});
	  res.send('Your favouites are: ' + req.user.customData.favs);
});
	router.get('/removeFavourite', stormpath.loginRequired, function (req, res) {
	  for(var i=0; i < req.user.customData.favs.length; i++){if (req.user.customData.favs[i]==req.param('market')){
	  delete req.user.customData.favs[i];}}
	  	  req.user.customData.save();

	  req.user.customData.save(function (err) {
		if (err) {
		  res.status(400).end('Oops!  There was an error: ' + err.userMessage);
		}else{
		  res.end('Custom data was saved!');}});
	  res.send('Your favouites are: ' + req.user.customData.favs);

	  res.send('Your email address is: ' + req.user.customData.favs);
});

    /* GET marketList page. */
    router.get('/marketList', function(req, res) {
      var db = req.db;
      var collection = db.get('marketCollection');
      // while (tempFMRowData !== "End of parsed data.") {
      //
      //   // Go through the parsed data row by row
      //   // Create a food market object with each row
      //   // Store or update database with object
      //   // Check if next row is endstr
      // }
      collection.find({},{},function(e,docs){
        res.render('marketList', {
          "marketList" : docs
        });
      });
    });

    /*GET marketFiltered page */
    router.get('/marketOrganized', function(req, res) {
      var db = req.db;
      var collection = db.get('marketCollection');
      collection.find({},{},function(e,docs){
        res.render('marketOrganized', {
          "marketOrganized" : docs, "user":req.user.customData.favs
        });
      });
    });

    router.get('/facebookTest', function(req, res) {
      res.render('facebookTest', {});
    });
    //API KEY: AIzaSyB9TqoY84nCZOotDUCSLNRBuhGr-aiBfSM
    router.get('/map', function(req, res) {
      var tempParser = new parser.Parser();
      var fmArray = tempParser.parseCsv("test.csv");
      var names = [];
      var addresses = [];
      var openHours = [];
      var closedHours = [];
      var days = [];
      var months = [];
      for (var i=1;i<fmArray.length; i++) {
        if (i == 11) {
        }
        else {
          var tempArray = fmArray[i];
          var name = tempArray[2];
          names.push(name);
          var address = tempArray[8];
          addresses.push(address);
          var oHour = tempArray[11];
          openHours.push(oHour);
          var cHour = tempArray[12];
          closedHours.push(cHour);
          var day = tempArray[13];
          days.push(day);
          var month = tempArray[14];
          months.push(month);
        }
      }
      /*var mapAddress = ["5300  East Boulevard, Vancouver BC", "2690  Larch St, Vancouver BC", "1100  Station St, Vancouver BC",
      "494 W 49th Av, Vancouver BC", "8683  Kerr St, Vancouver BC", "3092  Garden Drive, Vancouver BC", "1164  Comox St, Vancouver BC",
      "4580  Ontario St, Vancouver BC", "1100  Mainland St, Vancouver BC", "2300  Guelph St, Vancouver BC", "2403 W 8th Av, Vancouver BC",
      "2290 E 25th Av, Vancouver BC", "4065  Victoria Dr, Vancouver BC", "1375 E 47th Av, Vancouver BC", "5988  Nanaimo St, Vancouver BC",
      "1420 W 12th Av, Vancouver BC", "1305 W 70th Av, Vancouver BC", "1675  Charles St, Vancouver BC", "5175  Dumfries St, Vancouver BC",
      "2202  Cassiar St, Vancouver BC", "5288  Joyce St, Vancouver BC", "1  Kingsway , Vancouver BC", "800 E  Broadway Av, Vancouver BC",
      "1019  Broughton St, Vancouver BC"] */
      res.render('maps', {
        "names" : names,
        "addresses" : addresses,
        "openHours" : openHours,
        "closedHours" : closedHours,
        "days" : days,
        "months" : months
      });
    });

    /* GET Userlist page. */
    /*router.get('/userlist', function(req, res) {
        var db = req.db;
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    });

    /* GET New User Page */
    /*router.get('/newuser', function(req, res) {
      res.render('newuser', { title: 'Add New User' });
    });

    /* GET Test page */
    router.get('/testpage', function(req, res) {
      var db = req.db;
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

    /*Post to LoadMarket service */
    router.post('/loadMarket', function(req, res) {
      var db = req.db;
      var collection = db.get('marketCollection');

      var fm = new foodmarket.FoodMarket("a", "a", "a", "a", "a", "a");
      console.log(fm);
      console.log(fm.getName());

      var tempParser = new parser.Parser();
      var fmArray = tempParser.parseCsv("test.csv");
      var headers = fmArray[0];
      console.log(headers);
      console.log(fmArray[1]);

      var year;
      var type;
      var name;
      var op;
      var num;
      var direction;
      var sname;
      var stype;
      var address;
      var dir;
      var web;
      var openHour;
      var closeHour;
      var tempDay;
      var tempMonth;
      var vendors;
      var off;
      var fb;
      var fm_id;

      for (var i=1;i<fmArray.length; i++) {
        var tempArray = fmArray[i];

        //var testArray = fmArray[1];
        //year, type, name, op, num, direction, sname, stype, address, dir, web, openHour, closeHour, day, month, vendors, off, i
        year = tempArray[0];
        type = tempArray[1];
        name = tempArray[2];
        op = tempArray[3];
        num = tempArray[4];
        direction = tempArray[5];
        sname = tempArray[6];
        stype = tempArray[7];
        address = tempArray[8];
        dir = tempArray[9];
        web = tempArray[10];
        openHour = tempArray[11];
        closeHour = tempArray[12];
        tempDay = tempArray[13];
        tempMonth = tempArray[14];
        vendors = tempArray[15];
        off = tempArray[16];
        fb = tempArray[17];
        fm_id = tempArray[18];
//year, type, name, op, num, direction, sname, stype, address, dir, web, openHour, closeHour, day, month, vendors, off, i
        console.log(name);
        collection.update(
          {"name" : name},
          {
            "year" : year,
            "type" : type,
            "name" : name,
            "op" : op,
            "num" : num,
            "direction" : direction,
            "sname" : sname,
            "stype" : stype,
            "address" : address,
            "dir" : dir,
            "web" : web,
            "openHour" : openHour,
            "closeHour" : closeHour,
            "day" : tempDay,
            "month" : tempMonth,
            "vendors" : vendors,
            "off" : off,
            "fb" : fb
          },
          { upsert: true}

        );
      }

      var tempFMRowData = "";
          res.redirect("marketList");
    });

    /* POST to Add User Service */
    /*router.post('/adduser', function(req, res) {

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
    }); */
    module.exports = router;
  }
}




var router = new Router();
