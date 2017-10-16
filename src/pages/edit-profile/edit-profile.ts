import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { Profile } from "../profile/profile";
import {Http} from '@angular/http';


@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  navdata:any={};
  
    constructor(public alertController: AlertController,public navCtrl: NavController, public navParams: NavParams ,public http: Http) {
      console.log(this.navParams);
      this.navdata=this.navParams;        
    }
   
    edit_user_info(email,phone,school,degree,name){
	
							let confirm = this.alertController.create({
								title : 'Edit Profile',
                message:'Are you sure you to update your data ?',
                buttons: [
                  { 
                    text:'Yes',
                    handler:() =>{
  
                     this.navdata.data.user_email=email;
                     this.navdata.data.phone_no=phone;
                     this.navdata.data.school=school;
                     this.navdata.data.degree=degree;
                     this.navdata.data.user_name=name;
                   
                 console.log("data sent :" ,this.navdata.data);
       
                 this.http.post("https://ffserver.eu-gb.mybluemix.net/edit-user",this.navdata.data).subscribe(data => {
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
              console.log(this.navdata.data);
              
	}    
}
