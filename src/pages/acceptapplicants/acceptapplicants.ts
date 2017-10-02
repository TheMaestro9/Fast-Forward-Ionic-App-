import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import {Applicants} from '../applicants/applicants';

@IonicPage()
@Component({
  selector: 'page-acceptapplicants',
  templateUrl: 'acceptapplicants.html',
})
export class AcceptapplicantsPage {
  company_or_not;
  company_Simulations;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ngOnInit() {

   this.company_or_not= localStorage.getItem('company_or_not');
   console.log("company",this.company_or_not);
   
   this.http.get("https://ffserver.eu-gb.mybluemiVideosnet/get_company_simulations?company_id="+this.company_or_not).subscribe(data => {
    var res = JSON.parse(data['_body']);
    this.company_Simulations=res;
    console.log('array',this.company_Simulations);
    
  });


  }


  applicants_details(simulationData){
    this.navCtrl.push(Applicants,
    {
      name:simulationData.simulation_name,
      id:simulationData.simulation_date_id,
      price:simulationData.price
    });
  }
  

 


}
