///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>
var FoodMarket = (function () {
    function FoodMarket(name, address, openHour, closeHour, day, month) {
        this.name = name;
        this.address = address;
        this.openHour = openHour;
        this.closeHour = closeHour;
        this.day = day;
        this.month = month;
    }
    FoodMarket.prototype.getName = function () { return this.name; };
    FoodMarket.prototype.getAddress = function () { return this.address; };
    FoodMarket.prototype.getOpenHour = function () { return this.openHour; };
    FoodMarket.prototype.getCloseHour = function () { return this.closeHour; };
    FoodMarket.prototype.getDay = function () { return this.day; };
    FoodMarket.prototype.getMonth = function () { return this.month; };
    FoodMarket.prototype.setName = function (newName) { this.name = newName; };
    FoodMarket.prototype.setAddress = function (newAddress) { this.address = newAddress; };
    FoodMarket.prototype.setOpenHour = function (newOpenHour) { this.openHour = newOpenHour; };
    FoodMarket.prototype.setCloseHour = function (newCloseHour) { this.closeHour = newCloseHour; };
    FoodMarket.prototype.setDay = function (newDay) { this.day = newDay; };
    FoodMarket.prototype.setMonth = function (newMonth) { this.month = newMonth; };
    return FoodMarket;
})();
exports.FoodMarket = FoodMarket;
