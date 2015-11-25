///<reference path='../types/DefinitelyTyped/chai/chai-2.0.0.d.ts'/>
import expect = require('chai');
var expect = chai.expect;
import chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
import parser = require('../routes/parser/parser.js');
import foodmarket = require('../routes/foodmarket/FoodMarket.js');

describe('elements of the csv file', function() {
  var testParser = new parser.Parser();
  var testArray = testParser.parseCsv("unitTests.csv");
  describe('names column is correct', function() {
    var names = [];
    for (var i=1; i < testArray.length; i++) {
      var tArray = testArray[i];
      var name = tArray[2];
      names.push(name);
    };
    it('names are strings', function() {
      expect(names[1]).to.be.a('string');
    });
    it('outside array values are undefined', function() {
      expect(names[7]).to.be.undefined;
      expect(names[5]).to.be.undefined;
    });
    it('names are in the correct order', function() {
      expect(names[0]).to.equal("Kerrisdale Village Farmers Market");
      expect(names[1]).to.equal("Kitsilano Farmers Market");
      expect(names[2]).to.equal("Main St Station Farmers Market");
      expect(names[3]).to.equal("Oak Street Farmers Market");
      expect(names[4]).to.equal("River District Farmers Market");
    });
  });
  describe('number of columns is correct', function() {
    var numberOfElements = 0;
    var ttArray = testArray[1];
    for(var i=0; i < ttArray.length; i++) {
      numberOfElements++;
    };
    it('number of columns (elements) should equal 19', function(){
      expect(numberOfElements).to.equal(19);
    });
  });
  describe('name and address pairs are....paired', function() {
    var names = [];
    var addresses = [];
    for (var i=1; i < testArray.length; i++) {
      var tArray = testArray[i];
      var name = tArray[2];
      var address = tArray[8];
      names.push(name);
      addresses.push(address);
    };
    it('names array and addresses arrays should be same length', function() {
      expect(names.length).to.equal(addresses.length);
    });
    it('the i-th value in names array should be correctly paired with i-th value in addresses array', function() {
      expect(names[2]).to.equal("Main St Station Farmers Market");
      expect(addresses[2]).to.equal("1100  Station St, Vancouver BC");
    });
  });
  describe('column elements should be in correct order', function() {
    var tArray = testArray[4];
    it('first element is year', function() {
      expect(tArray[0]).to.equal("2014");
    });
    it('second element is MarketType', function() {
      expect(tArray[1]).to.equal("Farmers Market");
    });
    it('third element is Market Name', function() {
      expect(tArray[2]).to.equal("Oak Street Farmers Market");
    });
    it('fourth element is Market Operator', function() {
      expect(tArray[3]).to.equal("Unitarian Church ");
    });
    it('fifth element is Street Number', function() {
      expect(tArray[4]).to.equal("494");
    });
    it('sixth element is Street Direction', function() {
      expect(tArray[5]).to.equal("W");
    });
    it('seventh element is Street Name', function() {
      expect(tArray[6]).to.equal("49th");
    });
    it('eighth element is Merged Address', function() {
      expect(tArray[7]).to.equal("Av");
    });
    it('ninth element is Merged Address', function() {
      expect(tArray[8]).to.equal("494 W 49th Av, Vancouver BC");
    });
    it('tenth element is Market Direction', function() {
      expect(tArray[9]).to.equal("Parking lot of Unitarian Church");
    });
    it('eleventh element is Website', function() {
      expect(tArray[10]).to.equal("oakstreetmarket.ca");
    });
    it('twelfth element is Open Hour', function() {
      expect(tArray[11]).to.equal("3pm ");
    });
    it('thirteenth element is Closed Hour', function() {
      expect(tArray[12]).to.equal("7pm");
    });
    it('fourteenth element is Days', function() {
      expect(tArray[13]).to.equal("Wednesday");
    });
    it('fifteenth element is Months', function() {
      expect(tArray[14]).to.equal("June-January");
    });
    it('sixteenth element is Number of Vendors', function() {
      expect(tArray[15]).to.equal("15-25");
    });
    it('seventeenth element is Offerings', function() {
      expect(tArray[16]).to.equal("");
    });
    it('eighteenth element is the Facebook link', function() {
      expect(tArray[17]).to.equal("https://www.facebook.com/OakStreetMarket");
    });
  });
  describe('a empty slot in the excel file adds an empty element to the array', function() {
    var streetDir = [];
    for (var i=1; i < testArray.length; i++) {
      var tArray = testArray[i];
      var streetDirection = tArray[5];
      streetDir.push(streetDirection);
    }
    it('street directions for every market but the 3rd is ""', function() {
      expect(streetDir[0]).to.equal("");
      expect(streetDir[1]).to.equal("");
      expect(streetDir[2]).to.equal("");
      expect(streetDir[3]).to.not.equal("");
      expect(streetDir[4]).to.equal("");
    })
    it('there are still 5 elements in the streetDirection array despite 4 markets not having a street direction', function() {
      expect(streetDir.length).to.equal(5);
    });
  });
});
