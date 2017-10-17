import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import {  Requestdate } from "../requestdate/requestdate";
import { PaymentMethodPage } from '../payment-method/payment-method';
import {Http} from '@angular/http';
import { Storage } from '@ionic/storage';
import { Profile } from "../profile/profile"

@Component({
	selector: 'page-company',
	templateUrl: 'company.html'
})
export class CompanyPage {
	item: any;
	loading: boolean;
	company_details: any ={};
	company_simulations: any =[];
	refresher:any;
	loader:any={};
	read_more=[];
	follow="Follow";
  companyid=3;
userid;
actionSheet;
	constructor(platform:Platform, private store:Storage,public navCtrl: NavController, navParams: NavParams, private http: Http, public alertCtrl:AlertController,public loadingCtrl: LoadingController,public actionSheetCtrl: ActionSheetController) {
	
	this.companyid=navParams.get("co_id");
	
	platform.ready().then(()=>{
		
				platform.registerBackButtonAction(() =>{
				
				if(this.navCtrl.canGoBack()){
					if(this.actionSheet!=null){
						
					this.actionSheet.dismiss();
					}
								
				
					this.navCtrl.pop();
				  }
				  
				});
		
		
			  });

	
	}

	back_button(){
		this.navCtrl.pop();
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

		open_email_content_popup(){
			let alert = this.alertCtrl.create({
				title: 'Message',
				inputs: [
					{
						name: 'message',
						placeholder: 'Enter your message here...',
						type: 'text'
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
						text: 'Send',
						handler: data => {
							console.log(data.message);
						}
					}
				]
			});
			alert.present();
		}

			open_promo_code_popup(){
			let alert = this.alertCtrl.create({
				title: 'PromoCode',
				inputs: [
					{
						name: 'promo_code',
						placeholder: 'Enter Your Promo Code here...',
						type: 'text'
					}
				],
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
						handler: data => {
							console.log('Cancel clicked');
							//alert.dismiss() ; 
						}
					},
					{
						text: 'Enter',
						handler: data => {  
							console.log("data" , data) ; 
						//	var url = "https://ffserver.eu-gb.mybluemix.net/get-promo-code-discount?company_id="+this.companyid+"&promo_code="+data.promo_code ;
						//	console.log(url) ;  
							this.http.get("https://ffserver.eu-gb.mybluemix.net/get-promo-code-discount?company_id="+this.companyid+"&promo_code="+data.promo_code).subscribe(
								data2 => {
									//console.log("got response" ,res.price) ; 
									var res = JSON.parse(data2['_body']);
									if (res.length ===0 )
										this.showNotValidAlert() ; 
									else {
									for ( var i = 0 ; i< this.company_simulations.length ; i++ )
											this.company_simulations[i].price = this.company_simulations[i].price * res.price ; 
									} 
										});
						}
					}
				]
			});
			alert.present();
		}
       navigateToFB(){
		try {
			window.open(this.company_details.facebook_link, '_system');
		} catch (err) {
			alert("No facebook Link for this company");
		}
		
	   }

	   getLocation(){
		try {
			window.open(this.company_details.location, '_system');
		} catch (err) {
			alert("No Location Provided for this company");
		}
	   }
	   getEmail(){
		// try {
		// 	window.open(this.company_details.company_email, '_system');
		// } catch (err) {
		// 	alert("No Location Provided for this company");
		// }
	   }
		showNotValidAlert() {
			let alert = this.alertCtrl.create({
			title: ' ',
			subTitle: 'This Promo Code is not Valid For This Simulation',
			buttons: ['OK']
			});
			alert.present();
		}
		presentLoading() {
			this.loader = this.loadingCtrl.create({
				content: "Please wait..."
			});
			this.loader.present();
		}

		presentActionSheet(x,event) {

			if(x.status =="pending payment")
				 this.navCtrl.push(PaymentMethodPage ,{SimulationID:x.simulation_id});
			else {
				this.actionSheet = this.actionSheetCtrl.create({
					// title: '',
					buttons: [
					
						
						{
							text: 'Cancel',
							role: 'cancel',
							handler: () => {
								console.log('Cancel clicked');
							}
						}
					]
				});
			
				x.dates.forEach(element => {
					this.actionSheet.addButton({text:element.date,
					handler:()=>{
					this.Apply(element.date_id,x,event);
					}})
				});

					this.actionSheet.addButton(
					{
							text: 'Request New Date!',
							handler: () => {

								this.navCtrl.push(Requestdate,{SimID:x.simulation_id }) ; 
							}
					} 
				); 
				this.actionSheet.addButton(

				
					{
							text: 'Add Promo Code',
							handler: () => {
								setTimeout(() => {
								this.open_promo_code_popup() ; 
							}, 100);
							}
					} 
				); 
				this.actionSheet.present();
			 }
		}


	Apply(id,x,event){
		// if(x.price ==0){
		// 	this.http.get("https://ffserver.eu-gb.mybluemix.net/apply?user_id="+this.userid+"&simulation_date_id="+id).subscribe(
		// 		data => {
		// 			var res = JSON.parse(data['_body']);
		// 			x.status=res.result;
		
		// 	});
		// }
		// else{
		// 	this.navCtrl.push(PaymentMethodPage);
		// }
		console.log("userID ", this.userid) ; 
		console.log("simID ", id) ; 

this.http.get("https://ffserver.eu-gb.mybluemix.net/apply?user_id="+this.userid+"&simulation_date_id="+id).subscribe(
		 		data => {
		 			var res = JSON.parse(data['_body']);
		 			x.status=res.result;
		
		 	});
		
	}
		

	goToProfile() {


		this.navCtrl.push(Profile) ; 
	}
	ngOnInit() {
		//console.log('timer page');
		
		this.store.get('user_id').then((val) => {
		this.setid(val);
		this.http.get("https://ffserver.eu-gb.mybluemix.net/company_details?company_id="+this.companyid).subscribe(data => {
		var res = JSON.parse(data['_body']);
		this.company_details=res;
		console.log(this.company_details);
		//this.loader.dismiss();
		// this.loading=false;
	});
	this.http.get("https://ffserver.eu-gb.mybluemix.net/get_company_simulations2?company_id="+this.companyid+"&user_id="+this.userid).subscribe(data => {
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
}
