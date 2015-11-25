/// <reference path='types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='types/DefinitelyTyped/express/express.d.ts'/>
var Application = (function () {
    function Application() {
        var express = require('express');
        var path = require('path');
        var favicon = require('serve-favicon');
        var logger = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        var stormpath = require('express-stormpath');
        // New Code
        var mongo = require('mongodb');
        var monk = require('monk');
        var db = monk('localhost:27017/test2');
        var routes = require('./routes/index');
        var users = require('./routes/users');
        // var fm = require('./routes/foodmarket/FoodMarket');
        var app = express();
        // view engine setup
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'jade');
        // uncomment after placing your favicon in /public
        //app.use(favicon(__dirname + '/public/favicon.ico'));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));
        // Make our db accessible to our router
        app.use(function (req, res, next) {
            req.db = db;
            console.log('Time: ', Date.now());
            next();
        });
        var stormpath = require('express-stormpath');
        app.use(stormpath.init(app, {
            // Optional configuration options.
            expand: {
                customData: true
            },
            client: {
                apiKey: {
                    id: '6X068U6YV7L75FNKOG7HY4A5E',
                    secret: 'hQBVK7zJ90Qzb7emBW0oarsFJWFbA1FGir8ml/agR50'
                }
            },
            application: {
                href: 'https://api.stormpath.com/v1/applications/2YmTGX5SI0euCNvVV3Qt0q'
            },
            website: true
        }));
        // Once Stormpath has initialized itself, start your web server!
        app.on('stormpath.ready', function () {
            app.listen(8080);
        });
        app.use('/', routes);
        app.use('/users', users);
        // app.use('/foodmarket', fm);
        /// catch 404 and forwarding to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        /// error handlers
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
        module.exports = app;
    }
    return Application;
})();
var app = new Application();
