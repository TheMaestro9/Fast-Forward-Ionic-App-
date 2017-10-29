import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-edit-simulation',
  templateUrl: 'edit-simulation.html',
})
export class EditSimulationPage {
  company_simulations
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.company_simulations = this.navParams.data[0];
    console.log(this.company_simulations);
  }

  

}
