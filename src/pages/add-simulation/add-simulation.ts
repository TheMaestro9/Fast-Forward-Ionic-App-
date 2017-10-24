import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { Storage } from '@ionic/storage';
import { AddSimulationDetailsPage } from '../add-simulation-details/add-simulation-details';
import { SimulationDatesPage } from '../simulation-dates/simulation-dates';


@Component({
  selector: 'page-add-simulation',
  templateUrl: 'add-simulation.html',
})
export class AddSimulationPage {
  company_or_not:any;
  company_details: any ={};
  company_simulations: any =[];  
  read_more=[];  
  companyid;
  userid;
  date:any=[];
  
  constructor(private store:Storage , public navCtrl: NavController, public navParams: NavParams , private http: Http) {
    this.company_or_not = localStorage.getItem('company_or_not');
    this.companyid=navParams.get("co_id");
    
  }

  
  ngOnInit() {
		//console.log('timer page');
		
		this.store.get('user_id').then((val) => {
		this.setid(val);
		this.http.get("https://ffserver.eu-gb.mybluemix.net/company_details?company_id="+this.company_or_not).subscribe(data => {
		var res = JSON.parse(data['_body']);
		this.company_details=res;
		console.log(this.company_details);
		//this.loader.dismiss();
		// this.loading=false;
	});
	this.http.get("https://ffserver.eu-gb.mybluemix.net/get_company_simulations2?company_id="+this.company_or_not+"&user_id="+this.userid).subscribe(data => {
		var res = JSON.parse(data['_body']);
		this.company_simulations =res;
		for (let entry of this.read_more) {
			entry=false;
		}
		console.log(this.company_simulations);
		// this.loading=false;
	});
		
		
		});
					
	}

	setid(val){

	this.userid=val;

	}

	AddSimulation(){
    this.navCtrl.push(AddSimulationDetailsPage, this.company_or_not,this.company_simulations);
	}
	SimulationDates(index){
		this.navCtrl.push(SimulationDatesPage,this.company_simulations[index],this.company_simulations);
	}

}