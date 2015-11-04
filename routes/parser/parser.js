///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.connect = function (url) {
        console.log('parser connect');
    };
    Parser.prototype.parseCsv = function (csvFilePath) {
        var fs = require('fs');
        var Papa = require('babyparse');
        var parsedData;
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
            step: function (row) {
                tempRow = row.data;
                //console.log(row.data);
                verboseArrArr.push(tempRow);
            },
            complete: function (results) {
                console.log("End of parsed data.", results.data);
            }
        });
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
        var day;
        var month;
        var vendors;
        var off;
        var fm = new Array();
        var fmArray = new Array();
        for (var i = 0; i < verboseArrArr.length - 2; i++) {
            var itemArray = verboseArrArr[i];
            for (var j = 0; j < itemArray.length; j++) {
                var attributeArr = itemArray[0];
                year = attributeArr[0];
                type = attributeArr[1];
                name = attributeArr[2];
                op = attributeArr[3];
                num = attributeArr[4];
                direction = attributeArr[5];
                sname = attributeArr[6];
                stype = attributeArr[7];
                address = attributeArr[8];
                dir = attributeArr[9];
                web = attributeArr[10];
                openHour = attributeArr[12];
                closeHour = attributeArr[13];
                day = attributeArr[11];
                month = attributeArr[14];
                vendors = attributeArr[15];
                off = attributeArr[16];
                var tempArray = [year, type, name, op, num, direction, sname, stype, address, dir, web, openHour, closeHour, day, month, vendors, off, i];
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
    };
    Parser.prototype.store = function (json) {
        console.log('parser store');
    };
    return Parser;
})();
exports.Parser = Parser;
