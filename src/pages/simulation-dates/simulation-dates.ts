import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {AddSimulationDatePage } from '../add-simulation-date/add-simulation-date'
import { EditSimulationDatePage } from '../edit-simulation-date/edit-simulation-date';


@Component({
  selector: 'page-simulation-dates',
  templateUrl: 'simulation-dates.html',
})
export class SimulationDatesPage {
  company_or_not:any;
  company_details: any ={};
  company_simulations: any =[];
  simulationDate:any;  
  read_more=[];  
  companyid;
  sim_id;
  constructor(public navCtrl: NavController, public navParams: NavParams , private http: Http, public alertController: AlertController) {
    this.company_simulations = this.navParams.data;
    console.log(this.company_simulations.dates);
    this.sim_id=navParams.data.simulation_id;
    console.log("Simulation ID : ",this.sim_id);
  }
  
  
  ionViewWillEnter() {
	  this.getData();
  }
  AddDate(){
    this.navCtrl.push(AddSimulationDatePage , this.sim_id);
  }


  deleteSimulationDate(date_id){
    var Dateid = {simulation_date_id: date_id}
    console.log(date_id);
		let confirm=this.alertController.create({
		title : 'Confirm',
		message:
			'Are You Sure Want To Delete This Date ?!',
		buttons: [
	  	{text: 'No', role: 'cancel',},
	  	{text: 'Yes' ,
	  	handler: () => {
			this.http.post("https://ffserver.eu-gb.mybluemix.net/delete-simulation-date",Dateid).subscribe(data => {
          var res = JSON.parse(data['_body']);
          console.log(res);
					this.getData();
				});
	  		}
		}
	]
  });
  confirm.present();	
}

editDate(date_id){
  this.navCtrl.push(EditSimulationDatePage,date_id);
  
}
getData(){
  this.company_simulations = this.navParams.data;
  
}

}
