///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.connect = function () {
        console.log('parser connect');
    };
    Parser.prototype.parseCSVUrl = function (url) {
        console.log('parser parse');
        return this.url;
    };
    Parser.prototype.store = function (json) {
        console.log('parser store');
    };
    return Parser;
})();
exports.Parser = Parser;
