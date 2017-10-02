import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-expotimer',
  templateUrl: 'expotimer.html',
})
export class ExpotimerPage {

  check: any;
  
    StartDate;
    nowDate = new Date();
    diffDays;
    diffhours;
    diffmins;
    diffsecs;
    user_id;
    price: any;
  timer;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpotimerPage');
  }

  setprice(data){
    
        this.price=data.price;
     
      }
    
    setid(id){
    
      this.user_id=id;
      //alert('id'+this.user_id);
    
    }
    
    ngOnInit() {
     
    
      this.http.get("https://ffserver.eu-gb.mybluemix.net/check-expo-date").subscribe(data => {
        this.check = JSON.parse(data['_body']);
        this.StartDate=new Date(this.check.dead_line);
        console.log('date',this.StartDate);
        this.StartDate.setMilliseconds(0);
       
        this.timer=  Observable.interval(1000 ).subscribe(x => {
          this.timercal();
      
       });
                
              
            
  
           
     
      });
    
    
    
    }
      timercal(){
    let dump =new Date();
    dump.getTimezoneOffset();
    let diff=this.StartDate.getTime() - dump.getTime();
    var timeDiff = Math.abs(diff);
       this. diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));  
       this. diffhours = Math.floor((timeDiff-this.diffDays*1000*3600*24)/(1000*3600)) ; 
       this.diffmins= Math.floor(((timeDiff-this.diffDays*1000*3600*24)-this.diffhours*1000*3600) /(1000 * 60) ) ;
       this. diffsecs= Math.floor((((timeDiff-this.diffDays*1000*3600*24)-this.diffhours*1000*3600)- this.diffmins*1000 * 60) /(1000));
    
      let m=  Math.floor((diff/1000));
     
      
    if(m <=0){
      
      this.timer.unsubscribe();
  this.diffDays=0;
  this.diffhours=0;
  this.diffmins=0;
  this.diffsecs=0;
    
    }
    
    
    }
    
     

}
