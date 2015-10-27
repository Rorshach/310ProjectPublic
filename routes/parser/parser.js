///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>
var Parser = (function () {
    //public testField : string;
    function Parser() {
    }
    Parser.prototype.test = function () {
        //this.testField = "hello";
        // var x = 10;
        // console.log(x);
        console.log('testparser');
        //return this.testField
    };
    return Parser;
})();
exports.Parser = Parser;
