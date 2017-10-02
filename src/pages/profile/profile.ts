import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import {Http} from '@angular/http';
import {LoginPage} from'../login/login';
import { Facebook} from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';
import {FileChooser } from 'ionic-native'; 
import firebase from 'firebase' ; 
import { AngularFireAuth } from 'angularfire2/auth';
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
	firestore = firebase.storage() ; 
	
	constructor(private app:App,public navCtrl: NavController, navParams: NavParams,public http: Http, public alertCtrl:AlertController,public loadingCtrl: LoadingController,public actionSheetCtrl: ActionSheetController,private fb: Facebook,private store: Storage, public afa :AngularFireAuth) {
	

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
				//this.loading=false;
			});
			});
				 

		
	



	}

	loginToFireBase (){

		
		//var	fireauth = this.afa.auth() ; 

		this.afa.auth.signInWithEmailAndPassword("walidmoussa995@gmail.com" , "wwwlll").then((res)=>{

				alert('sucessfull Login') ; 
				this.upload () ; 

		}).catch((err)=>{
				alert("error login "+err) ;
		}) ; 

	}
	upload () {


			FileChooser.open().then((url)=> {

				(<any>window).FilePath.resolveNativePath(url, (result)=> {

					this.nativePath = result ; 
					this.uploadImage ( ) ;
				})
			})
	}

	uploadImage () 
	{
			(<any>window).resolveLocalFileSystemURL (this.nativePath , (res)=>{
				res.file((resFile)=>{
					var reader = new FileReader () ; 
					reader.readAsArrayBuffer (resFile) ; 
					reader.onload = (evt: any)=>{

					var imgBlob = new Blob ([evt.target.result] , {type : 'image/jpeg'}) ;  
					var imageStore = this.firestore.ref().child('image') ; 
					imageStore.put(imgBlob).then((res)=>{
						alert("uploaded sucessfully ") ; 
					}).catch ((err)=>{
						alert('upload faild'+ err) ; 
					}) ;
					} 

				}) ; 
			})
	}
	edit_user_info(type){
		let value={};
		switch(type){
			case "email":value = this.user_info.user_email;break;
			case "phone":value = this.user_info.phone_no;break;
			case "school":value = this.user_info.school;break;
			case "degree":value = this.user_info.degree;break;
			case "name":value = this.user_info.user_name;break;
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


}
