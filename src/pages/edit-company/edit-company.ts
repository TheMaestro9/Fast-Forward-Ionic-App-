import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the EditCompanyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit-company',
  templateUrl: 'edit-company.html',
})
export class EditCompanyPage {

  company_or_not: any;
  company_details: any ={};
  constructor(public alertController: AlertController,public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    //console.log("da ell " ,navParams);
    this.company_or_not = localStorage.getItem('company_or_not');
    this.http.get("https://ffserver.eu-gb.mybluemix.net/company_details?company_id="+this.company_or_not).subscribe(data => {
      var res = JSON.parse(data['_body']);
      this.company_details=res;
      console.log(this.company_details)
    });

  }

  edit_company_info(name,description){
    
                let confirm = this.alertController.create({
                  title : 'Edit Profile',
                  message:'Are you sure you to update your data ?',
                  buttons: [
                    { 
                      text:'Yes',
                      handler:() =>{
    
                       this.company_details.company_name=name;
                       this.company_details.description=description;
                     
                   console.log("data sent :" ,this.company_details);
         
                   this.http.post("https://ffserver.eu-gb.mybluemix.net/edit-company",this.company_details).subscribe(data => {
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
                console.log(this.company_details);
                
    }    
  
  

}
