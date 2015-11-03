///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.connect = function (url) {
        console.log('parser connect');
    };
    Parser.prototype.parseCSVUrl = function (url) {
        //var JSFtp = require('jsftp');
        // var ftp = new JSFtp({
        //   host: 'ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv',
        //   port: 8803,
        //   //,user: 'anonymous'
        //   //pass: 'chrome@example.com',
        // });
        //
        // console.log(ftp);
        // console.log(ftp.port);
        // var webServer = require('csvtojson').interfaces.web;
        //
        // var server = webServer.startWebServer({
        //   "port":"8801",
        //   "urlpath":"ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv"
        // });
        //
        // console.log(server);
        //var myUrl = importUrl.parse("ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv");
        // var Converter = require('csvtojson').Converter;
        // var converter = new Converter({constructResult:false}); // For big csv data
        //
        // converter.on('record_parsed', function (jsonObj) {
        //     console.log(jsonObj);
        //     //require('request').get(jsonObj).pipe(converter);
        // });
        //require('request').get(jsonObj).pipe(converter);
        var csvFilePath = ("test.csv");
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
        var content = fs.readFileSync(csvFilePath, { encoding: 'binary' });
        Papa.parse(content, {
            step: function (row) {
                console.log("Row: ", row.data);
            }
        });
        Papa.parse(csvFilePath, {
            complete: function (results) {
                console.log("Finished:", results.data);
            }
        });
        // Unparses the json text into csv
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
        console.log(csv1);
        var tempCSV = new Csv(csv1);
        console.log(tempCSV.getCsvData());
        var tempJSON = Papa.parse(csv1);
        console.log(tempJSON);
        console.log('parser parse');
        return this.url;
    };
    Parser.prototype.store = function (json) {
        console.log('parser store');
    };
    return Parser;
})();
exports.Parser = Parser;
