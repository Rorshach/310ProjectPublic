///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>

import importUrl = require('url');

export interface ParserInterface {
  // Need individual files for this. Refactor later.
  connect(url: string) : void;
  parseCSVUrl(url : string) : string;
  store(json: string) : void;
}

export class Parser implements ParserInterface {
  //public testField : string;
  private url: string;
  private json: string;

  constructor() {
  }

  connect(url: string) {

    console.log('parser connect');
  }

  parseCSVUrl(url: string) {

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
      "port":"8801",
      "urlpath":"ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv"
    });

    console.log(server);
    var myUrl = importUrl.parse("ftp://webftp.vancouver.ca/OpenData/csv/CommunityFoodMarketsandFarmersMarkets.csv");
    //console.log(myUrl);

    var Converter = require('csvtojson').Converter;
    var converter = new Converter({constructResult:false}); // For big csv data

    converter.on('record_parsed', function (jsonObj) {
        console.log(jsonObj);
        //require('request').get(jsonObj).pipe(converter);
    });

    //require('request').get(jsonObj).pipe(converter);

    console.log('parser parse');
    return this.url;
  }

  store(json: string) {

    console.log('parser store');
  }



}
