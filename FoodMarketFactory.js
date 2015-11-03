///<reference path='types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='types/DefinitelyTyped/express/express.d.ts'/>
///<reference path='FoodMarket.ts'/> 

var FoodMarketFactory = (function () {
    function FoodMarketFactory() {
        this.foodMarketArray = [];
        if (FoodMarketFactory._instance) {
            console.log("Error: Instantiation failed: Use FoodMarketFactory.getInstance() instead of new.");
        }
        FoodMarketFactory._instance = this;
    }
    FoodMarketFactory.getInstance = function () {
        return FoodMarketFactory._instance;
    };
    FoodMarketFactory.prototype.addFoodMarket = function (fm) {
        this.foodMarketArray.push(fm);
    };
    FoodMarketFactory.prototype.getFoodMarket = function (fmName) {
        var contains = false;
        for (var i = 0; i < this.foodMarketArray.length; i++) {
            var temp = this.foodMarketArray[i];
            var tempName = temp.getName;
            if (tempName === (fmName)) {
                contains = true;
                return temp;
                break;
            }
        }
        if (!contains) {
            console.log("The market doesn't exist.");
        }
    };
    FoodMarketFactory._instance = new FoodMarketFactory();
    return FoodMarketFactory;
})();
