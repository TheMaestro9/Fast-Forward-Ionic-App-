import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
  SimulationID ; 
  loader;
  constructor(public navCtrl: NavController,private store:Storage, public navParams: NavParams,private http:Http,private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPaymentPage');
  }

    ngOnInit() {
      this.SimulationID = this.navParams.get("SimulationID") ; 

      console.log("simulation" , this.SimulationID); 
		this.store.get('user_id').then((user_id) => {

      this.presentLoading() ;      
        var PaymentData ={
        "simulation_id": this.SimulationID , 
        "user_id": user_id 
        }
        this.http.post("https://ffserver.eu-gb.mybluemix.net/test" , PaymentData).subscribe(data => {
            var res = JSON.parse(data['_body']);
            this.payMob_link=res.url;
            this.dismissLoading();            
            console.log("link" , res.url); 
      // console.log('link',this.link);
        }); 
    

   });
    // var PaymentData ={
    //   "simulation_date_id"  : 10 , 
    //   "user_id": 324 , 
    //   "price":300 
    // }
    // this.http.post("https://ffserver.eu-gb.mybluemix.net/test" , PaymentData).subscribe(data => {
    //   var res = JSON.parse(data['_body']);
    //  this.payMob_link=res.url;
    //  console.log("link" , res.url); 
    // // console.log('link',this.link);
     
   // });


  }
  presentLoading() {
    this. loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
   this. loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }
}
