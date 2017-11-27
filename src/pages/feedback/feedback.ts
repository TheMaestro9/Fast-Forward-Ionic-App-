import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

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
  simulationName;
  simulationDateID;
  simulationDetails:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http) {
    // this.simulationId=this.navParams.data[0].simulation_id;
    // console.log("Simulation ID : " , this.simulationId);
     console.log("data : ",this.navParams.data)
     this.simulationName=this.navParams.data.company_sim[0].simulation_name;
    this.simulationDateID=this.navParams.data.dateId;
    console.log(this.simulationDateID);
    this.http.get("https://ffserver.eu-gb.mybluemix.net/get-feedback-details?simulation_date_id="+this.simulationDateID).subscribe(data => {
      var res = JSON.parse(data['_body']);
      this.simulationDetails =res[0];
      console.log("Simulation Details : ",this.simulationDetails);
      // this.loading=false;
    });
    console.log("Simulation details in constructor : ",this.simulationDetails);
    }
  starClicked(value){
    console.log("Rated :", value);
    this.rate=value;
 }
 
 
}
