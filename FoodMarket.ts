///<reference path='types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='types/DefinitelyTyped/express/express.d.ts'/>
	 
class FoodMarket {
    //properties
    name: string;
    address: string;
    openHour: string;
    closeHour: string;
    day: string;
    month: string;

    constructor(name: string, address: string, openHour: string, closeHour: string, day: string, month: string) {
        this.name = name;
        this.address = address;
        this.openHour = openHour;
        this.closeHour = closeHour;
        this.day = day;
        this.month = month;
    }   
	
    // functions
	
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