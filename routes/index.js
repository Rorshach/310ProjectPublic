///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../types/DefinitelyTyped/express/express.d.ts'/>
///<reference path='./foodmarket/FoodMarket'/>
var parser = require('./parser/parser');
var foodmarket = require('./foodmarket/foodmarket');
//import fmf = require(./foodmarket/foodmarketfactory);
var Router = (function () {
    function Router() {
        var express = require('express');
        var router = express.Router();
        /* GET home page. */
        router.get('/', function (req, res, next) {
            var fmUrl = ('ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv');
            var tempParser = new parser.Parser();
            tempParser.connect(fmUrl);
            //tempParser.parseCsvUrl("testUrl");
            tempParser.store("testStore");
            res.render('index', { title: 'Food Market Locator' });
        });
        /* GET Hello World page. */
        router.get('/helloworld', function (req, res) {
            res.render('helloworld', { title: 'Hello, World' });
        });
        /* GET marketList page. */
        router.get('/marketList', function (req, res) {
            var db = req.db;
            var collection = db.get('marketCollection');
            // while (tempFMRowData !== "End of parsed data.") {
            //
            //   // Go through the parsed data row by row
            //   // Create a food market object with each row
            //   // Store or update database with object
            //   // Check if next row is endstr
            // }
            collection.find({}, {}, function (e, docs) {
                res.render('marketList', {
                    "marketList": docs
                });
            });
        });
        /*GET marketFiltered page */
        router.get('/marketOrganized', function (req, res) {
            var db = req.db;
            var collection = db.get('marketCollection');
            collection.find({}, {}, function (e, docs) {
                res.render('marketOrganized', {
                    "marketOrganized": docs
                });
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
		    
        /* GET Calendar Page */
        router.get('/calendar', function(req, res) {
          res.render('calendar', { title: 'Calendar' });
        });
    
        /* GET Test page */
        router.get('/testpage', function (req, res) {
            var db = req.db;
            var collection = db.get('marketCollection');
            var name = "tempName2";
            var address = "tempAddress";
            var openHour = "tempOpenHour";
            var closeHour = "tempCloseHour";
            var tempDay = "tempDay";
            var tempMonth = "temp Month";
            collection.insert({
                "name": name,
                "address": address,
                "openHour": openHour,
                "closeHour": closeHour,
                "day": tempDay,
                "month": tempMonth
            }, function (err, doc) {
                if (err) {
                    res.send("There was a problem adding data to the database.");
                }
                else {
                    collection.find({}, {}, function (e, docs) {
                        res.render('testpage', { title: 'Test Title' });
                    });
                }
            });
        });
        /*Post to LoadMarket service */
        router.post('/loadMarket', function (req, res) {
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
            var fm_id;
            for (var i = 1; i < fmArray.length; i++) {
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
                fm_id = tempArray[17];
                //year, type, name, op, num, direction, sname, stype, address, dir, web, openHour, closeHour, day, month, vendors, off, i
                console.log(name);
                collection.update({ "name": name }, {
                    "year": year,
                    "type": type,
                    "name": name,
                    "op": op,
                    "num": num,
                    "direction": direction,
                    "sname": sname,
                    "stype": stype,
                    "address": address,
                    "dir": dir,
                    "web": web,
                    "openHour": openHour,
                    "closeHour": closeHour,
                    "day": tempDay,
                    "month": tempMonth,
                    "vendors": vendors,
                    "off": off
                }, { upsert: true });
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
    return Router;
})();
var router = new Router();
