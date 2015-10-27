///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>
var importUrl = require('url');
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.connect = function (url) {
        console.log('parser connect');
    };
    Parser.prototype.parseCSVUrl = function (url) {
        var JSFtp = require('jsftp');
        // var ftp = new JSFtp({
        //   host: 'ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv',
        //   port: 8803,
        //   //,user: 'anonymous'
        //   //pass: 'chrome@example.com',
        // });
        //
        // console.log(ftp);
        // console.log(ftp.port);
        var webServer = require('csvtojson').interfaces.web;
        var server = webServer.startWebServer({
            "port": "8801",
            "urlpath": "ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv"
        });
        console.log(server);
        var myUrl = importUrl.parse("ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv");
        //console.log(myUrl);
        var Converter = require('csvtojson').Converter;
        var converter = new Converter({ constructResult: false }); // For big csv data
        converter.on('record_parsed', function (jsonObj) {
            console.log(jsonObj);
            require('request').get(jsonObj).pipe(converter);
        });
        //require('request').get(jsonObj).pipe(converter);
        console.log('parser parse');
        return this.url;
    };
    Parser.prototype.store = function (json) {
        console.log('parser store');
    };
    return Parser;
})();
exports.Parser = Parser;
