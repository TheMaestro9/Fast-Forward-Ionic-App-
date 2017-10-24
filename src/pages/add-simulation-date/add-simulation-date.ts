import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { SimulationDatesPage } from '../simulation-dates/simulation-dates';


@Component({
  selector: 'page-add-simulation-date',
  templateUrl: 'add-simulation-date.html',
})
export class AddSimulationDatePage {
  date:any=[];
  check;
  simulation_id ; 
  localDate:string=new Date().toDateString();
   nowDate=new Date();
   color="color:#32db64";
   dump:any;
    dump1:any;
    formGroup;
    today;
    maxyear;
    minyear;
    private myDate: string  ; 
    private myTime:string ;
  constructor(platform:Platform,public http: Http,public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,private DS:DataService,private store:Storage) {
    this.simulation_id=this.navParams.data;
    console.log(this.simulation_id);
    this.minyear=this.nowDate.getFullYear();

    console.log('year',this.minyear);
    
  this.maxyear=this.minyear+1;
     
  }
  setDate(){
    console.log('local',this.localDate);
    console.log("still out ya naaas " , this.myDate); 
      console.log("still out ya 3alaam " , this.myTime);
      var parts = this.myDate.split('-') ;
      var date =  new  Date(+parts[0] , +parts[1]-1 , +parts[2]) ;
      var timeParts = this.myTime.split(':') ; 
      date.setHours(+timeParts[0]+2) ; 

   
    var theDate = date.toISOString().replace("T"," ").replace("Z","") ; 
    console.log('date',theDate);

    let simDate={
      "date":theDate , 
      "simulation_id":this.simulation_id 
    }
    console.log("daa el sim date ",simDate);
    this.http.post("https://ffserver.eu-gb.mybluemix.net/add-simulation-date", simDate).subscribe(data => {
      
      var res = JSON.parse(data['_body']);
      this.setresponse(res);
      console.log("The Date : ",res);
    });
    console.log("the date in the function",theDate); 
  
   
  
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
        this.navCtrl.pop();             
       }      
      }
    

}