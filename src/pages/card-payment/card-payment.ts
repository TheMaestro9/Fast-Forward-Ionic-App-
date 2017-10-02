import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';

/**
 * Generated class for the CardPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-card-payment',
  templateUrl: 'card-payment.html',
})
export class CardPaymentPage {
  payMob_link ; 
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPaymentPage');
  }

    ngOnInit() {

    this.http.get("https://ffserver.eu-gb.mybluemix.net/test").subscribe(data => {
      var res = JSON.parse(data['_body']);
     this.payMob_link=res.url;
    // console.log('link',this.link);
     
    });


  }

}
