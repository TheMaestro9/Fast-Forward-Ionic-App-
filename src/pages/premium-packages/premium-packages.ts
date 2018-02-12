import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import {PaymentMethodPage} from '../payment-method/payment-method'

/**
 * Generated class for the PremiumPackagesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-premium-packages',
  templateUrl: 'premium-packages.html',
})
export class PremiumPackagesPage {

  packages ; 
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    public http :Http 
  ) {
    this.http.get("https://ffserver.eu-gb.mybluemix.net/get-packages").subscribe(data => {
        var res = JSON.parse(data['_body']);
        this.packages = res ; 
      })
  }

  packageClicked(pack) {

    var passedObj = { 
      wallet:pack.wallet , 
      price : pack.price , 
      orderType:'package'
    }
    this.navCtrl.push(PaymentMethodPage , passedObj) ;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PremiumPackagesPage');
  }

}
