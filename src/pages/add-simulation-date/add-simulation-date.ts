import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';


@Component({
  selector: 'page-add-simulation-date',
  templateUrl: 'add-simulation-date.html',
})
export class AddSimulationDatePage {
  date:any=[];
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
    this.minyear=this.nowDate.getFullYear();
    console.log('year',this.minyear);
    
  this.maxyear=this.minyear+1;
     
  }

  

}
