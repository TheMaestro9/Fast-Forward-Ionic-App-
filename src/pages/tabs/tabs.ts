import { Component } from '@angular/core';

import { FieldsPage } from '../fields/fields';
import { Videos } from '../videos/videos';
import { Profile } from "../profile/profile";
import { ActionSheetController, Platform, LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import { AcceptapplicantsPage } from "../acceptapplicants/acceptapplicants";
//import {ExpotimerPage} from '../expotimer/expotimer';


@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	company_or_not: any;
	expo:any;
	tab1Root = FieldsPage;
	tab2Root = Videos;
	tab3Root = Profile;
	//tab5Root = ExpotimerPage;
	ios: boolean = false;
	root;
	connection_error_popup:any;
	constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, navParams: NavParams, public http: Http, public plt: Platform, public alertCtrl: AlertController, private network: Network, private loadingCtrl: LoadingController) {
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
					}
				},
				{
					text: 'Edit Profile',
					handler: () => {
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

		actionSheet.present();
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
					placeholder: 'Enter video description here...',
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
					text: 'Add',
					handler: data => {
						var video = {
							"video_link": data.video_link,
							"description": data.video_description,
							"company_id": "5"
						}
						console.log(data.video_link);
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
