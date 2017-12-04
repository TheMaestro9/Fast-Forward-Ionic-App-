import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';


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
  simulationDetails:any={};
  userID;
  simulationDateID;  
  feedbackDescp:string;
  check;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http,private store: Storage,public alertCtrl: AlertController) {
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
    console.log("Rate : ",this.rate);      
    return value;
  }
  AddFeedback(){
    this.store.get('feedBackDetails').then((val) => {
      console.log("user_id", val.user_id);
      console.log("Simulation Date ID in val: ",val.simulation_date_id);
      console.log("Rate mo5tlf : ",this.rate);  
      let feedbackDetails = {
        user_id:val.user_id,
        simulation_date_id:val.simulation_date_id,
        notes:this.feedbackDescp,
        rating:this.rate
      }
      this.http.post("https://ffserver.eu-gb.mybluemix.net/add-feedback", feedbackDetails).subscribe(data => {
        
        var res = JSON.parse(data['_body']);
        this.setresponse(res);
        console.log("etbaaa3",res);
      });
      console.log("Feedack Details : ",feedbackDetails);
			});
			
      this.navCtrl.setRoot(TabsPage);
  }
  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: ' ',
      subTitle: msg,
      buttons: ['OK'],
      
    });
    alert.present();
    
    }
    
    setresponse(value) {
      this.check = value;
      if (this.check.result == false) {
        this.showAlert(this.check.msg);
      }
      else if(this.check.result==true){
        this.showAlert(this.check.msg);
       }      
      }
 
}
