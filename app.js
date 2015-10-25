///<reference path='types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='types/DefinitelyTyped/express/express.d.ts'/>
var Application = (function () {
    function Application() {
        var express = require('express');
        var path = require('path');
        var favicon = require('serve-favicon');
        var logger = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        // New Code
        var mongo = require('mongodb');
        var monk = require('monk');
        var db = monk('localhost:27017/nodetest1');
        var routes = require('./routes/index');
        var users = require('./routes/users');
        var Papa = require('babyparse');
        var fs = require('fs');

        var testFile = 'nodetest1/test.csv';


        //var JSFtp = require('jsftp');

        //var Ftp = new JSFtp({
          //host: 'localhost'
        //});
        // Converter class
        // csv to json converter for WEBSERVER
        //var Converter = require('csvtojson').Converter;
        // The constructResult parameter=false will turn off final result construction in memory for stream feature.
        // toArrayString will stream out a normal JSON array object.
        //var csvConverter = new Converter({constructResult:false, toArrayString:true}); //big csv data
        //var readStream = require('fs').creatReadStream('ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv');
        //var writeStream = require('fs').createWriteStream();
        // record_parsed will be emitted each csv row being processed
        //converter.on("record_parsed", function (jsonObj) {
          //console.log(jsonObj); //result json object
        //});
        // Causes error below
        //require("request").get("ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv").pipe(converter);

        // Converter with Papaparse

        //Papa.parse("http://example.com/file.csv", {
          //download: true,
          //complete: function(results) {
            //console.log(results);
          //}
        //});
        // var databaseURL = 'ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv'
        // var filename = farmerMarketCSVData;
        // // Download a file from url
        // function saveFile(url) {
        //   var xhr = new XMLHttpRequest();
        //   xhr.responseType = 'blobl';
        //   xhr.onload = function() {
        //     var docE = document.createElement('docE');
        //     docE.href = window.URL.createObjectURL(xhr.response); // xhr.response is blob
        //     docE.download = filename; // Set filename
        //     doce.style.display = 'none';
        //     document.body.appendChild(docE);
        //     docE.click();
        //     delete docE;
        //   };
        //   xhr.open('GET', url);
        //   xhr.send();
        // }

        //var A = [['n','sqrt(n)']];  // initialize array of rows with header row as 1st item

        //for(var j=1;j<10;++j){ A.push([j, Math.sqrt(j)]) }

        //var csvRows = [];
        //for(var i=0,l=A.length; i<l; ++i){
          //      csvRows.push(A[i].join(','));   // unquoted CSV row
        //}
        //var csvString = csvRows.join('\n');

        //var a = document.createElement('a');
        //a.href     = 'data:attachment/csv,' + csvString;
        //a.target   ='_blank';
        //a.download = 'myFile.csv,' + encodeURIComponent(csvString); ;
        //a.innerHTML = "Click me to download the file.";
        //document.body.appendChild(a);

        var app = express();

        // Constuctor?
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

        //app.get('/', function(req, res){
          //res.send("Test Message");
        //});
        app.use('/', routes);
        app.use('/users', users);

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

        var csv = Papa.unparse([
        	{
        		"Column 1": "foo",
        		"Column 2": "bar"
        	},
        	{
        		"Column 1": "abc",
        		"Column 2": "def"
        	}
        ]);

        var json = Papa.parse(csv);
        console.log(csv);
        console.log(json);

        module.exports = app;



    }
    return Application;
})();

var app = new Application();

//var testUser = require('./User');

var testFile = "test.csv";
var fs = require('fs');
var Papa = require('babyparse');
var Csv = (function () {
    function Csv(csvData) {
      this.csvData = csvData;
    }

    Csv.prototype.getCsvData = function () {
      return this.csvData;
    };

    return Csv;
})();

var csv1 = Papa.unparse([
  {
    "Column 1": "foo",
    "Column 2": "bar"
  },
  {
    "Column 1": "abc",
    "Column 2": "def"
  }
]);

// var tempVar = new Csv(csv1);
// console.log(tempVar.getCsvData());
//
// var content = fs.readFileSync(testFile, { encoding: 'binary' });
// Papa.parse(content, {
//     step: function(row){
//         console.log("Row: ", row.data);
//     }
// });

//Papa.parse(testFile, {
  //complete: function(results) {
    //console.log("Finished:", results.data);
  //}
//});
