///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>

export interface ParserInterface {
  // Need individual files for this. Refactor later.
  connect() : void;
  parseCSVUrl(url : string) : string;
  store(json: string) : void;
}

export class Parser implements ParserInterface {
  //public testField : string;
  private url: string;
  private json: string;

  constructor() {
  }

  connect() {

    console.log('parser connect');
  }

  parseCSVUrl(url: string) {

    console.log('parser parse');
    return this.url;
  }

  store(json: string) {

    console.log('parser store');
  }



}
