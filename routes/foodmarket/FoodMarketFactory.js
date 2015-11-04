// ///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
// /// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>
// // ///<reference path='./FoodMarket.ts'/>
//
// import fm = require(./foodmarket);
//
// export interface FoodMarketFactoryInterface {
// 		getInstance() : FoodMarketFactory;
// 		addFoodMarket(fm: FoodMarket): void;
// 		getFoodMarket(fmName: string): FoodMarket;
//
// }
//
// export class FoodMarketFactory implements FoodMarketFactoryInterface {
//
//     private static _instance: FoodMarketFactory = new fm.FoodMarketFactory();
//     private foodMarketArray = [];
//
//     constructor() {
//         if (FoodMarketFactory._instance) {
//             console.log("Error: Instantiation failed: Use FoodMarketFactory.getInstance() instead of new.");
//         }
//         FoodMarketFactory._instance = this;
//
//     }
//
//     public static getInstance(): FoodMarketFactory {
//         return FoodMarketFactory._instance;
//     }
//
//     public addFoodMarket(fm: FoodMarket): void {
//         this.foodMarketArray.push(fm);
//     }
//
//     public getFoodMarket(fmName: string): FoodMarket {
//         var contains = false;
//         for (var i = 0; i < this.foodMarketArray.length; i++) {
//             var temp = this.foodMarketArray[i];
//             var tempName: string = temp.getName;
//             if (tempName === (fmName)) {
//                 contains = true;
//                 return temp;
//                 break;
//             }
//
//         }
//         if (!contains) {
//             console.log("The market doesn't exist.");
//
//         }
//
//
//
//     }
// }
