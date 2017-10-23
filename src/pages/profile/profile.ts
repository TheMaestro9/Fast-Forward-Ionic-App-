import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import {Http} from '@angular/http';
import {EditProfilePage } from "../edit-profile/edit-profile";
import {LoginPage} from'../login/login';
import { Facebook} from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';
import {FileChooser } from 'ionic-native'; 
import { AngularFireAuth } from 'angularfire2/auth';
import {DataService} from '../../providers/data-service';
import {Observable} from 'rxjs/Rx';
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
	providers: [AngularFireAuth]
})
export class Profile {
	user_info:any={};
	user_simulations:any=[];
	refresher:any;
	nativePath: any; 
	StartDate;
	check:any;
	nowDate = new Date();
	diffDays;
	diffhours;
	diffmins;
	diffsecs;
	user_id;
    timer;
	
	constructor(private app:App,public navCtrl: NavController, navParams: NavParams,private DS:DataService,public http: Http, public alertCtrl:AlertController,public loadingCtrl: LoadingController,public actionSheetCtrl: ActionSheetController,private fb: Facebook,private store: Storage, public afa :AngularFireAuth) {
	

		this.store.get('user_id').then((val) => {
	
			  
			http.get("https://ffserver.eu-gb.mybluemix.net/user_info?id="+val).subscribe(data => {
				var res = JSON.parse(data['_body']);
				this.user_info=res;
				console.log(this.user_info);
				//this.loading=false;
			});
			
			http.get("https://ffserver.eu-gb.mybluemix.net/user_simulations?id="+val).subscribe(data => {
				var res = JSON.parse(data['_body']);
				this.user_simulations=res;
				console.log(this.user_info);
				//console.log("STAT",this.user_simulations[0].status);
				//this.loading=false;
			});
			});

	}
	
	EditProfile(){
		console.log("sha3'aaaaal");
		this.navCtrl.push(EditProfilePage, this.user_info);
	}
	
	removeSimulation(sim){
		
		
		this.store.get('user_id').then((val) => {
		console.log("selected", sim )  ;
		console.log("all",this.user_simulations)  ;
		
		console.log("index", this.user_simulations.indexOf(sim) )  ;
					this.http.get("https://ffserver.eu-gb.mybluemix.net/user_delete_simulation?user_id="+val+"&simulation_id="+sim.simulation_date_id).subscribe(data => {
					//	var res = JSON.parse(data['_body']);
						console.log(data['_body']);
						//this.loading=false;
					});
					console.log("user_id",val)
				});

		this.user_simulations.splice(this.user_simulations.indexOf(sim),1);
		
	  }
	
	
	
	
	edit_user_info(type){
		let value={};
		switch(type){
			case "name":value = this.user_info.user_name;break;			
			case "email":value = this.user_info.user_email;break;
			case "phone":value = this.user_info.phone_no;break;
			case "school":value = this.user_info.school;break;
			case "degree":value = this.user_info.degree;break;
		}
		let alert = this.alertCtrl.create({
			title: 'Edit your '+type,
			inputs: [
				{
					name: 'edited_data',
					placeholder: 'Enter your '+type +' here...',
					type: type=="phone"?'number':'text',
					value: ''+ value
				}
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Edit',
					handler: data => {
						switch(type){
							case "email":this.user_info.user_email=data.edited_data;break;
							case "phone":this.user_info.phone_no=data.edited_data;break;
							case "school":this.user_info.school=data.edited_data;break;
							case "degree":this.user_info.degree=data.edited_data;break;
							case "name":this.user_info.user_name=data.edited_data;break;
						}
					console.log(this.user_info);
					// this.http.get("https://ffserver.eu-gb.mybluemix.net/edit-user?user_name="+this.user_info.user_name+"&degree="+this.user_info.degree+"&user_email="+this.user_info.user_email+"&school="+this.user_info.school+"&phone_no="+this.user_info.phone_no+"&user_id="+this.user_info.user_id).subscribe(data => {
					// 	var res = JSON.parse(data['_body']);
					// 	// this.user_simulations=res;
					// 	console.log(res);
					// 	// this.loading=false;
					// });

					this.http.post("https://ffserver.eu-gb.mybluemix.net/edit-user",this.user_info).subscribe(data => {
						var res = JSON.parse(data['_body']);
						// this.user_simulations=res;
						console.log(res);
						// this.loading=false;
					});

					}
				}
			]
		});
		alert.present();
	}

		showHead(refresher) {
			this.refresher=refresher;
			setTimeout(() => {
				refresher.complete();
			}, 5000);
		}
		hideHead(){
			if(this.refresher)
				this.refresher.complete();
		}



		logout(){

this. store.set('user_id', "");
localStorage.setItem('expo',null);
this.fb.logout();
this.app.getRootNav().setRoot(LoginPage);
//root.popToRoot();

		}
	
		addTimer(date){
			
			  console.log("in add timer",date)
			  this.StartDate=new Date(date)
			  console.log('date',this.StartDate);
			  this.StartDate.setMilliseconds(0);
			 
			  this.timer=  Observable.interval(1000 ).subscribe(x => {
				
				this.timercal();
			  });
			
		   
	 
	
		}
		status(sim){
			if(sim.status==="pending payment"){
				this.addTimer(sim.acceptance_deadline);
				return true;
			}
		}
		timercal(){
			let dump =new Date();
			
			//this.StartDate = new Date(dump.getTime() + 24 * 60 * 60 * 1000);
			console.log("INNNN",this.StartDate);
			dump.getTimezoneOffset();
			let diff=this.StartDate.getTime() - dump.getTime();
			var timeDiff = Math.abs(diff);
			this. diffDays = Math.floor(timeDiff / (1000 * 3600 * 24)); 
			this. diffhours =Math.floor((timeDiff-this.diffDays*1000*3600*24)/(1000*3600)) ; 
			this.diffmins= Math.floor(((timeDiff-this.diffDays*1000*3600*24)-this.diffhours*1000*3600) /(1000 * 60) ) ;
		  
		    this.diffhours+=(this.diffDays*24);
		
		}

}