import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class User {
private type=null;
private fname=null;
private lname=null;
private ID=null;
  constructor(public http: Http) {
    console.log('Hello User Provider');
  }


  setVariables(type1,fname1,lname1,id1) {
    this.type = type1;
this.fname = fname1;
this.lname = lname1;
this.ID = id1;

  }

  getfname() {
    return this.fname;
  }
 getlname() {
    return this.lname;
  }
   gettype() {
    return this.type;
  }
   getID() {
    return this.ID;
  }


}
