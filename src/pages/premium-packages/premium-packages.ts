import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  items ; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.items=[
      {
        "offer": "10 simulations", 
        "price": 400 
      }, 
      {
        "offer": "2 simulations", 
        "price": 100 
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PremiumPackagesPage');
  }

}
