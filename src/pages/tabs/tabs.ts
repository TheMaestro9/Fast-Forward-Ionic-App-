import { Component } from '@angular/core';

import { FieldsPage } from '../fields/fields';
import { Videos } from '../videos/videos';
import { Profile } from "../profile/profile";
import { AddSimulationPage } from "../add-simulation/add-simulation"
import { ActionSheetController, Platform, LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { AcceptapplicantsPage } from "../acceptapplicants/acceptapplicants";
import { EditCompanyPage } from '../edit-company/edit-company';
import { ChooseCompanyPage } from '../choose-company/choose-company';

//import {ExpotimerPage} from '../expotimer/expotimer';


@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	company_or_not: any;
	superAdmin;
	expo: any;
	tab1Root = FieldsPage;
	tab2Root = Videos;
	tab3Root = Profile;
	//tab5Root = ExpotimerPage;
	ios: boolean = false;
	root;
	companies = [];
	connection_error_popup: any;
	AcceptedSimulations =[]; 
	user_simulations: any = [];
	constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, navParams: NavParams, public http: Http, private store: Storage, public plt: Platform, public alertCtrl: AlertController, private network: Network, private loadingCtrl: LoadingController) {
		this.network.onDisconnect().subscribe(() => {
			this.connection_error_popup = this.loadingCtrl.create({
				content: "No internet connection !",
				spinner: 'hide'
			});
			this.connection_error_popup.present();
		});
		this.network.onConnect().subscribe(() => {
			this.connection_error_popup.dismiss();
		});
		this.store.get('user_id').then((val) => {

			console.log("the Bolean:" , navParams.get("goToCompany")) ;
			console.log("the Garbage:" , navParams.get("goToCompanys")) ;
			

			http.get("https://ffserver.eu-gb.mybluemix.net/user_info?id=" + val).subscribe(data => {
				var res = JSON.parse(data['_body']);
				this.superAdmin = res.company_or_not;
				console.log(this.superAdmin);
				//this.loading=false;
			});
			http.get("https://ffserver.eu-gb.mybluemix.net/user_simulations?id=" + val).subscribe(data => {
				var res = JSON.parse(data['_body']);
				this.user_simulations = res;
				console.log(this.user_simulations);
				//console.log("STAT",this.user_simulations[0].status);
				//this.loading=false;
				
			});
		});

		http.get("https://ffserver.eu-gb.mybluemix.net/all-companies?id=").subscribe(data => {
			var res = JSON.parse(data['_body']);
			this.companies = res;
			console.log(this.companies);
			//this.loading=false;
		});
		this.root = this.tab1Root;
		this.company_or_not = localStorage.getItem('company_or_not');
		if (plt.is('ios')) {
			this.ios = true;
		}
		//this.expo= localStorage.getItem('expo');

	}
	switch1() {
		this.root = this.tab1Root;
	}
	switch2() {
		this.root = this.tab2Root;
	}
	switch3() {
		this.root = this.tab3Root;
	}
	switch4() {
		this.presentAdminActionSheet();
	}


	presentAdminActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({

			buttons: [
				{
					text: 'Add Simulation',
					handler: () => {
						console.log('17 Jan, 11:00 AM');
						this.navCtrl.push(AddSimulationPage);
						console.log(this.company_or_not);

					}
				},
				{
					text: 'Edit Profile',
					handler: () => {
						this.navCtrl.push(EditCompanyPage, this.company_or_not);
						console.log('20 Feb, 7:300 AM');
					}
				},
				{
					text: 'Add Video',
					handler: () => {
						setTimeout(() => {
							this.show_add_video_popup();
						}, 100);
					}
				},
				{
					text: 'Accept Applicants',
					handler: () => {
						this.navCtrl.push(AcceptapplicantsPage);
					}
				},

				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]

		});
		if (this.superAdmin == -2) {
			actionSheet.addButton({
				text: 'Choose Company',

				handler: () => {

					setTimeout(() => {
						this.ChooseCompanyList();

					}, 100);
				}

			});
		}
		actionSheet.present();
	}

	CheckAccepted() {
		var acceptedDates = [];
		this.store.get('Accepted').then((val) => {
			if (val != null)
				acceptedDates = val;

			console.log(acceptedDates) ; 
			for ( var i=0 ; i < this.AcceptedSimulations.length ; i ++) {
		//	acceptedDates = [ 1 , 2  , 3] ; 
				var simulation = this.AcceptedSimulations[i] ; 
				if (simulation.status == "accepted")
				{	var feedBack = {}; 
					 feedBack["simulation_date_id"] = simulation.simulation_date_id ; 
					 feedBack["date"] = simulation.applied_simulation_date ; 
					 if ( this .CheckFeedExist (acceptedDates , simulation.simulation_date_id))					 
						acceptedDates.push (feedBack) ; 
				}
			}
			this.store.set('Accepted', acceptedDates);
			
		});
	}

	CheckFeedExist ( acceptedDates , newId ){
		console.log("checking ") ; 
		//console.log(newId) ; 
		//console.log(acceptedDates[0].simulation_date_id) ; 
		for( var i=0 ; i < acceptedDates.length ; i ++) {
			if ( acceptedDates[i].simulation_date_id == newId)
				return false ; 
		} 
		return true ; 
	}
	ChooseCompanyList() {
		let alert = this.alertCtrl.create();
		alert.setTitle('Select Gender');
		for (var index = 0; index < this.companies.length; index++) {
			var element = this.companies[index];
			alert.addInput({
				type: 'radio',
				label: element.company_name,
				value: element.company_id,
				checked: false
			});
		}


		alert.addButton('Cancel');
		alert.addButton({
			text: 'OK',
			handler: data => {
				this.company_or_not = data;
				localStorage.setItem('company_or_not', this.company_or_not);
				console.log("hya de", data);
			}
		});
		alert.present();
	}

	show_add_video_popup() {
		this.alertCtrl.create({
			title: 'Add video to your media feed',
			inputs: [
				{
					name: 'video_link',
					placeholder: 'Enter youtube or facebook link here...',
					type: 'text'
				},
				{
					name: 'video_description',
					placeholder: 'Enter description here...',
					type: 'text'
				},

				{
					name: 'video_or_not',
					placeholder: 'Enter 1 for video 0 for image...',
					type: 'text'
				},


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
					text: 'Add',
					handler: data => {

						console.log("ana goa and this is the data :", data);
						var videoOrNot = 0;
						if (data.video_or_not == "1")
							videoOrNot = 1;
						var video = {
							"video_link": data.video_link,
							"description": data.video_description,
							"company_id": this.company_or_not,
							"video_or_not": videoOrNot
						}
						console.log(video);
						this.http.post("https://ffserver.eu-gb.mybluemix.net/add-video", video).subscribe(data => {
							var res = JSON.parse(data['_body']);
							// this.user_simulations=res;
							console.log(res);
							// this.loading=false;
						});

					}
				}
			]
		}).present();



	}
}
