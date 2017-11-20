import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-edit-simulation-date',
  templateUrl: 'edit-simulation-date.html',
})
export class EditSimulationDatePage {

  private myDate: string  ; 
  private myTime:string ;
  constructor(public http: Http,public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.data);
  }

  updateDate(){
    console.log("still out ya 3alaam " , this.myTime);
    var parts = this.myDate.split('-') ;
    var date =  new  Date(+parts[0] , +parts[1]-1 , +parts[2]) ;
    var timeParts = this.myTime.split(':') ; 
    date.setHours(+timeParts[0]+2) ; 

 
  var theDate = date.toISOString().replace("T"," ").replace("Z","") ; 
  console.log('date',theDate);

  let simDate={
    "simulation_date_id":this.navParams.data,
    "date":theDate
  }
  console.log("daa el sim date ",simDate);
  this.http.post("https://ffserver.eu-gb.mybluemix.net/edit-simulation-date",simDate).subscribe(data => {
    
    var res = JSON.parse(data['_body']);
    console.log("The Date : ",res);
  });
  console.log("the date in the function",theDate);

 

 }
      
  
}
