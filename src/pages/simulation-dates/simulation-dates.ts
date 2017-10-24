import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddSimulationDatePage } from '../add-simulation-date/add-simulation-date'


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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.company_simulations = this.navParams.data;
    console.log(this.company_simulations);
    this.simulationDate=this.company_simulations.dates[0].date;
    console.log(this.simulationDate);
  }
  AddDate(){
    this.navCtrl.push(AddSimulationDatePage);
  }

}
