import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Http } from '@angular/http';
import {AddSimulationDatePage } from '../add-simulation-date/add-simulation-date'

@Component({
  selector: 'page-add-simulation-details',
  templateUrl: 'add-simulation-details.html',
})
export class AddSimulationDetailsPage {
  fields:any=[];
  company_or_not:any;
  simName:string;
  price:number;
  description:string;
  fieldID:number;
  check;
  constructor(platform:Platform,public navCtrl: NavController,public DS: DataService, 
     public http: Http,public navParams: NavParams,public alertCtrl: AlertController,
     public plt: Platform) {
    this.company_or_not = localStorage.getItem('company_or_not');
    this.simName = navParams.get("name");
    this.description = navParams.get("description");
    this.price=navParams.get("price");
    this.fields=[
      {name:"MARKETING",id:1},
      {name:"SOFTWARE ENGINEERING",id:2},
      {name:"ARCHITECTURE",id:3},
      {name:"BANKING",id:4},
      {name:"TV Production",id:5},      
      {name:"FASHION DESIGN",id:6},
      {name:"JOURNALISM",id:7},
      {name:"INDUSTRIAL",id:8},
      {name:"Medicine",id:9},      
      {name:"Entrepreneurship",id:10},      
    ];
    
  }

  AddSimulationDetails(){
    let sim={
      company_id:this.company_or_not,
      simulation_name:this.simName,
      description:this.description,
      price:this.price,
      field_id:this.fieldID
    }
    

  this.http.post("https://ffserver.eu-gb.mybluemix.net/add-simulation", sim).subscribe(data => {
    
    var res = JSON.parse(data['_body']);
    this.setresponse(res);
    console.log("etbaaa3",res);
  });
  console.log(sim);  
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
    this.navCtrl.push(AddSimulationDatePage,this.check.simulation_id);
   }      
  }
  }



