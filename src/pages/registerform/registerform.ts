import { DataService } from './../../providers/data-service';
import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {TutorialPage} from '../tutorial/tutorial' ; 


@IonicPage()
@Component({
  selector: 'page-registerform',
  templateUrl: 'registerform.html',
})
export class Registerform {
  interests=[];
  degree = "";
  name = "";
  email = "";
  localDate ;
  check;
  ios: boolean = false;
  connection_error_popup: any;
  promo_code: string = "";
  day;
  month;
  year;
  major="";
loader;
  age=new Date();
  expo;
  constructor(platform:Platform,public navCtrl: NavController,public DS: DataService,  public http: Http,public navParams: NavParams,public alertCtrl: AlertController,public plt: Platform,private network: Network, private loadingCtrl: LoadingController, private store: Storage) {


    this.network.onDisconnect().subscribe(() => {
      this.connection_error_popup = this.loadingCtrl.create({
        content: "No internet connection !",
        spinner: 'hide'
      });
      this.connection_error_popup.present();
    });
    this.network.onConnect().subscribe(() => {
      this.connection_error_popup.dismiss();
    });

    
    platform.ready().then(()=>{
      
              platform.registerBackButtonAction(() =>{
      
                if(this.navCtrl.canGoBack()){
                  this.navCtrl.pop();
                }
              });
      
      
            });
  
    this.name = navParams.get("name");
  // this.getage = navParams.get("age");
    this.email = navParams.get("email");
    //alert(this.name+this.age+this.email);
    
    if (plt.is('ios')) {
      this.ios = true;
    }
  this.expo=false;
  }
  setDate(event){
    this.age=event;
    this.age.setHours(this.age.getHours()+2);
    }


  register(pass, school, phone,promo) {
   

this.age.setFullYear(this.year,this.month,this.day);


    if (this.name != "" && this.email != "" && pass != "" && school != "" && this.age !=this.localDate && phone != "" ){
      console.log("not null");
      if(phone>1299999999 && phone<1000000000)this.showAlert("Enter a valid phone number");
      else{
        this.presentLoading() ;
     let user={
        
        degree:this.degree,
        user_name:this.name,
        user_email:this.email,
        birth_date:this.age.toISOString(),
        password:pass,
        school:school,
        phone_no:phone,
        promo_code:promo,
        interests:this.interests,
        major:this.major,
        expo:this.expo
        
        }
        




this.http.post("https://ffserver.eu-gb.mybluemix.net/register3", user).subscribe(data => {
  
  var res = JSON.parse(data['_body']);
  this.setresponse(res);
  if (this.expo)localStorage.setItem('expo','1');
  this.dismissLoading();
});

    }}

    else {

      this.showAlert("Fill all information please");

    }


  }
  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: ' ',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  setresponse(value) {

    this.check = value;

    if (this.check.result == false) {
      this.showAlert(this.check.msg);

    }
    else if(this.check.result==true){
      this.store.set('user_id', this.check.user_id);

     
      this.navCtrl.setRoot(TutorialPage);
                  
          }
          
          

      

  }



  setdata(response) {

    this.name = response.name;
    this.email = response.email;
    this.age = response.birthday;


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
