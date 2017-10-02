import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataService} from '../../providers/data-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public response:any;
  username;
  id;


  constructor(public navCtrl: NavController,private DS:DataService) {

  }


   ngOnInit() {
 
this.DS.seturl("https://ffserver.eu-gb.mybluemix.net/login?user_name=mohamed_salah95&password=123456");
this.DS.load().subscribe(
            data => this.setresponse(data)
            
        );

  }

setresponse(value){
this.response=value;
console.log("value",value);
console.log("res",this.response);
this.username=value.user_name;
this.id=value.user_id;


}



}
