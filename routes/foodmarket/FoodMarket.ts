///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>

export interface FoodMarketInterface {
  getName() : string;
  getAddress() : string;
  getOpenHour() : string;
  getCloseHour() : string;
  getDay() : string;
  getMonth() : string;

  setName(newName: string) : void;
  setAddress(newAddress: string) : void;
  setOpenHour(newOpenHour: string) : void;
  setCloseHour(newCloseHour: string) : void;
  setDay(newDay: string) : void;
  setMonth(newMonth: string) : void;
}

export class FoodMarket implements FoodMarketInterface {
    private name: string;
    private address: string;
    private openHour: string;
    private closeHour: string;
    private day: string;
    private month: string;

    constructor(name: string, address: string, openHour: string, closeHour: string, day: string, month: string) {
        this.name = name;
        this.address = address;
        this.openHour = openHour;
        this.closeHour = closeHour;
        this.day = day;
        this.month = month;
    }

    getName() { return this.name; }
    getAddress() { return this.address; }
    getOpenHour() { return this.openHour; }
    getCloseHour() { return this.closeHour; }
    getDay() { return this.day; }
    getMonth() { return this.month; }

    setName(newName: string) { this.name = newName; }
    setAddress(newAddress: string) { this.address = newAddress; }
    setOpenHour(newOpenHour: string) { this.openHour = newOpenHour; }
    setCloseHour(newCloseHour: string) { this.closeHour = newCloseHour; }
    setDay(newDay: string) { this.day = newDay; }
    setMonth(newMonth: string) { this.month = newMonth; }
}
