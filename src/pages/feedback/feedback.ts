import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  rate;
  simulationId;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.simulationId=this.navParams.data[0].simulation_id;
    console.log("Simulation ID : " , this.simulationId);
  }
  starClicked(value){
    console.log("Rated :", value);
    this.rate=value;
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

}
