import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform ,AlertController } from 'ionic-angular';
import {CardPaymentPage} from '../card-payment/card-payment'

@IonicPage()
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html',
})
export class PaymentMethodPage {
link;
SimulationID ; 
  constructor(platform:Platform,public navCtrl: NavController, public navParams: NavParams , public alertController: AlertController) {
  
    platform.ready().then(()=>{
      
              platform.registerBackButtonAction(() =>{
      
                if(this.navCtrl.canGoBack()){
                  this.navCtrl.pop();
                }
              });
      
      
            }, (error) => { console.log(error) });
  }
  back_button(){

    this.navCtrl.pop();
  }

  CardPayment() { 

    console.log("payment method sim id" , this.SimulationID ) ; 
    this.navCtrl.push(CardPaymentPage , {SimulationID:this.SimulationID}) ;
  }

  vodafoneCashPayment(){
    // alert("You can submit a Vodafone Cash payment to : 01014623562.\n (Vodafone Branches: https://goo.gl/6CP94K)\n Then confirm by sending an email to support@fastforwardsim.com");
    
    let confirm=this.alertController.create({
      title : 'Vodafone Cash',
      message:
       '<p>You can submit a Vodafone Cash payment to : 01014623562.</p>' + 
      '<p>Then confirm by sending an email to support@fastforwardsim.com</p>',
      buttons: [
        {text: 'Ok'}]
    });
    confirm.present();
  
  }

  

  EgBankCashPayment(){
    // alert("You can submit a Vodafone Cash payment to : 01014623562.\n (Vodafone Branches: https://goo.gl/6CP94K)\n Then confirm by sending an email to support@fastforwardsim.com");
    
    let confirm=this.alertController.create({
      title : 'Bank Deposit',
      message:
      '<p>You can deposit the fees to EGBANK\'s account number: 605661, with the account name: Fast Forward.</p>' + 
      '<p>Then confirm by sending a picture of your receipt to support@fastforwardsim.com</p>',
      buttons: [
        {text: 'Ok'}]
    });
    confirm.present();
  
  }

  OfficeCashPayment(){
    let confirm=this.alertController.create({
      title : 'Office Payment',
      message:
       '<p>You can call (+2)01120055087 to schedule a time to come pay the fees in our Dokki office.</p>' , 
        buttons: [
        {text: 'Ok'}]
    });
    confirm.present();
  }

  ngOnInit() {

    // this.http.get("https://ffserver.eu-gb.mybluemix.net/go-to-payment").subscribe(data => {
    //   var res = JSON.parse(data['_body']);
    //  this.link=res.url;
    //  console.log('link',this.link);
     
    // });

  this.SimulationID =  this.navParams.get("SimulationID");

}



}
