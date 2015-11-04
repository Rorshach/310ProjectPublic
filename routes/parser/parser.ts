///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>

import importUrl = require('url');

export interface ParserInterface {
  // Need individual files for this. Refactor later.
  connect(url: string) : void;
  parseCsv(csvFilePath : string) : Array<Array<string>>;
  store(json: string) : void;
}

export class Parser implements ParserInterface {
  private url: string;
  private json: string;

  constructor() {
  }

  connect(url: string) {

    console.log('parser connect');
  }

  parseCsv(csvFilePath: string) {
    var fs = require('fs');
    var Papa = require('babyparse');

    var parsedData : string;
    parsedData = "testParse";

    var Csv = (function () {
        function Csv(csvData) {
          this.csvData = csvData;
        }

        Csv.prototype.getCsvData = function () {
          return this.csvData;
        };

        return Csv;
    })();

    // change the output type to be the complete parsed file
    // parsed data should be stored in a string and returned later
    // append "End of parsed data" when Finished
    var tempRow = "";
    var content = fs.readFileSync(csvFilePath, { encoding: 'binary' });
    var verboseArrArr = new Array();
    Papa.parse(content, {
        step: function(row){
            tempRow = row.data;
            //console.log(row.data);
            verboseArrArr.push(tempRow);
        },
        complete: function(results) {
          console.log("End of parsed data.", results.data);
        }
    });

    var name;
    var address;
    var openHour;
    var closeHour;
    var day;
    var month;

    var fm = new Array();
    var fmArray = new Array();

    for (var i=0; i<verboseArrArr.length - 2; i++) {
      var itemArray = verboseArrArr[i];
      for (var j=0; j<itemArray.length; j++) {
        var attributeArr = itemArray[0];
        name = attributeArr[2];
        address = attributeArr[8];
        openHour = attributeArr[12];
        closeHour = attributeArr[13];
        day = attributeArr[11];
        month = attributeArr[14];
        var tempArray = [name, address, openHour, closeHour, day, month];
        fm = tempArray;
        fmArray.push(fm);
      }
    }

    //console.log(fmArray); // If you want to see all the usable food markets

    // Papa.parse(csvFilePath, {
    //   complete: function(results) {
    //     console.log("Finished:", results.data);
    //   }
    // });

    // Unparses the json text into csv
    // var csv1 = Papa.unparse([
    //   {
    //     "Column 1": "foo",
    //     "Column 2": "bar"
    //   },
    //   {
    //     "Column 1": "abc",
    //     "Column 2": "def"
    //   }
    // ]);
    //
    // console.log(csv1);
    // var tempCSV = new Csv(csv1);
    // console.log(tempCSV.getCsvData());
    //
    // var tempJSON = Papa.parse(csv1);
    //console.log(tempJSON);

    console.log('parser parse');
    return fmArray;
    //return this.url;
  }

  store(json: string) {

    console.log('parser store');
  }



}
