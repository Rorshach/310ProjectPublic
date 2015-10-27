///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>

export interface ParserInterface {
  test() : void;
}

export class Parser implements ParserInterface {
  //public testField : string;

  constructor() {

  }

  test() {
    //this.testField = "hello";
    // var x = 10;
    // console.log(x);
    console.log('testparser');
    //return this.testField
  }
}
