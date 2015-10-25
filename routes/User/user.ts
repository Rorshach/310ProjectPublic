///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>

export interface UserInterface {
  getName() : string;
  getEmail() : string;
}

export class User implements UserInterface {
  private userName: string;
  private userEmail: string;

  constructor(userName: string, userEmail: string) {
    this.userName = userName;
    this.userEmail = userEmail;
  }

  getName() {
    return this.userName;
  }

  getEmail() {
    return this.userEmail;
  }
}
