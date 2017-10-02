import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataService {

  public packageurl: string;

  constructor(public http: Http) {
    console.log('Hello DataService Provider');
  }


  seturl(st){

this.packageurl=st;

}
load(){

return  this.http.get(this.packageurl)
      .map(res => res.json());

 

}


}
