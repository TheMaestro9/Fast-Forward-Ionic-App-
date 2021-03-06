import { DataService } from './../../providers/data-service';
import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {TutorialPage} from '../tutorial/tutorial' ; 


@IonicPage()
@Component({
  selector: 'page-registerform',
  templateUrl: 'registerform.html',
})
export class Registerform {
  company_or_not:any;  
  interests="";
  degree = "";
  name = "";
  email = "";
  localDate ;
  check;
  ios: boolean = false;
  connection_error_popup: any;
  promo_code: string = "";
  private myDate: string  ; 
  // day;
  // month;
  // year;
  major="";
  loader;
  age=new Date();
  constructor(platform:Platform,public navCtrl: NavController,public DS: DataService, 
   public http: Http,public navParams: NavParams,public alertCtrl: AlertController,
   public plt: Platform,private network: Network, private loadingCtrl: LoadingController, 
   private store: Storage) {

    this.company_or_not=-1;
    localStorage.setItem('company_or_not', this.company_or_not);
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

    
    // platform.ready().then(()=>{
      
    //           platform.registerBackButtonAction(() =>{
      
    //             if(this.navCtrl.canGoBack()){
    //               this.navCtrl.pop();
    //             }
    //           });
      
      
    // });
  
    // this.name = navParams.get("name");
    // this.getage = navParams.get("age");
    //this.email = navParams.get("email");
    //alert(this.name+this.age+this.email);
    
  }


  // setDate(event){
  //   this.age=event;
  //   this.age.setHours(this.age.getHours()+2);
  //   }
   handleBirthDateFormat() { 
    var parts = this.myDate.split('-') ;
    var date =  new  Date(+parts[0] , +parts[1]-1 , +parts[2]) ;
    date.setHours(date.getHours()+2) ; 
    return date ; 
   }

   checkPhoneNumber(phone) {

    console.log("after div" , phone / 100000000) ; 
    if (phone < 1599999999 && phone > 1000000000)
      return true;
    else
      if (Math.floor(phone / 100000000) == 5) // phone is starting with 05 ie from saudi arabia 
        return true;
      else
        return false;
  }
  register(pass, school, phone,promo) {
   

   var bDate =  this.handleBirthDateFormat() ; 
   console.log("el date ya man" , bDate.toISOString()) ; 

    if (this.name != "" && this.email != "" && pass != "" && school != "" && this.age !=this.localDate && phone != "" ){
      console.log("not null");
      if(!this.checkPhoneNumber(phone))
        this.showAlert("Enter a valid phone number. make sure you have entered 11 numbers");
      else{
        this.presentLoading() ;
        var interestsArr = []; 
        interestsArr.push(this.interests) ;
        let user={
          
          degree:this.degree,
          user_name:this.name,
          user_email:this.email,
          birth_date:bDate.toISOString(),
          password:pass,
          school:school,
          phone_no:phone,
          promo_code:promo,
          interests:interestsArr,
          major:this.major        
        }


        console.log("the data to send is ", user) ; 

      this.http.post("https://ffserver.eu-gb.mybluemix.net/register3", user).subscribe(data => {
        
        var res = JSON.parse(data['_body']);
        this.handleResponse(res);
        this.dismissLoading();
      } , err => {this.showAlert(err)});

    }
  }

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

  handleResponse(value) {
    this.check = value;
    if (this.check.result == false) {
      this.showAlert(this.check.msg);
    }
    else if(this.check.result==true){
      this.store.set('user_id', this.check.user_id);
      this.navCtrl.setRoot(TutorialPage);             
     }      
  }



  // setdata(response) {
  //   this.name = response.name;
  //   this.email = response.email;
  //   this.age = response.birthday;
  // }

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
