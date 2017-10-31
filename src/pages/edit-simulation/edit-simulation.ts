import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-edit-simulation',
  templateUrl: 'edit-simulation.html',
})
export class EditSimulationPage {
  company_simulations;
  fields;
  constructor(public alertController: AlertController,public navCtrl: NavController, public navParams: NavParams ,public http: Http) {
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
    this.company_simulations = this.navParams.data;
    console.log(this.company_simulations);
  }

  edit_sim_info(name,price,description,fieldID){
    
                let confirm = this.alertController.create({
                  title : 'Edit Profile',
                  message:'Are you sure you to update your data ?',
                  buttons: [
                    { 
                      text:'Yes',
                      handler:() =>{
                       this.company_simulations.simulation_name=name;
                       this.company_simulations.price=price;
                       this.company_simulations.description=description;
                       this.company_simulations.field_id=fieldID;
                       this.company_simulations.user_name=name;
                     
                   console.log("data sent :" ,this.company_simulations);
         
                   this.http.post("https://ffserver.eu-gb.mybluemix.net/edit-simulation",this.company_simulations).subscribe(data => {
                     var res = JSON.parse(data['_body']);
                     // this.user_simulations=res;
                     console.log("et3'yar");
                     console.log(res);
                     // this.loading=false;
                   });
                  this.navCtrl.pop();
                  }
                  },
                  {text : 'No' }
                ]
                });
                confirm.present(); 
                console.log(this.company_simulations);
                
    } 

}
