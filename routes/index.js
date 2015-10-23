///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var Router = (function () {
    function Router() {
        var express = require('express');
        var router = express.Router();
        /* GET home page. */
        router.get('/', function (req, res, next) {
            res.render('index', { title: 'Express' })
        });
        /* GET Hello World page. */
        router.get('/helloworld', function (req, res) {
            res.render('helloworld', { title: 'Hello, World' });
        });
        /* GET Userlist page. */
        router.get('/userlist', function (req, res) {
            var db = req.db;
            var collection = db.get('usercollection');
            collection.find({}, {}, function (e, docs) {
                res.render('userlist', {
                    "userlist": docs
                });
            });
        });
        /* GET New User Page */
        router.get('/newuser', function (req, res) {
            res.render('newuser', { title: 'Add New User' });
        });

        /* GET Test Page */
        router.get('/testpage', function(req, res) {
          res.render('testpage', { title: 'Test Title' });
        });

        /* POST to Add User Service */
        router.post('/adduser', function (req, res) {
            // Set our internal DB variable
            var db = req.db;
            // Get our form values. These rely on the "name" attributes
            var userName = req.body.username;
            var userEmail = req.body.useremail;
            // Create a new user
            var tempUser = new User(userName, userEmail);
            // Set our collection
            var collection = db.get('usercollection');
            // Submit to the DB
            collection.insert({
                "username": userName,
                "email": userEmail
            }, function (err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database");
                }
                else {
                    // And forward to success page
                    res.redirect("userlist");
                }
            });
        });
        module.exports = router;
    }
    return Router;
})();

var User = (function () {
    function User(userName, userEmail) {
        this.userName = userName;
        this.userEmail = userEmail;
    }
    User.prototype.getName = function () {
        return this.userName;
    };
    User.prototype.getEmail = function () {
        return this.userEmail;
    };
    return User;
})();
var router = new Router();
