
import { VersionCheckPage } from './../pages/version-check/version-check';
import { TabsPage } from './../pages/tabs/tabs';
import { Component,Inject, ViewChild } from '@angular/core';
import { Platform,Nav,NavController,LoadingController } from 'ionic-angular';
import { Deeplinks } from '@ionic-native/deeplinks';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { DataService } from '../providers/data-service';
import { Network } from '@ionic-native/network';
import { CardPaymentPage } from '../pages/card-payment/card-payment';
import {  TutorialPage } from '../pages/tutorial/tutorial';
import {  CompanyPage } from '../pages/company/company';

@Component({
  templateUrl: 'app.html',
})


export class MyApp {
  rootPage: any;
  id;
  timer;
  date;
  nextpage;
  check;

  connection_error_popup: any;
  constructor(platform: Platform, statusBar: StatusBar, private loadingCtrl: LoadingController, splashScreen: SplashScreen, private DS: DataService, private network: Network, public store: Storage,private deeplinks:Deeplinks) {
 
    platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.deeplinks.route({
        '/login': LoginPage,
        '/company':CompanyPage
      }).subscribe((match) => {
      
      console.log('Successfully matched route', match);
    }, (nomatch) => {
      
      console.error('Got a deeplink that didn\'t match', nomatch);
    });
    
    });
  
    //this.rootPage=TabsPage;this.handelResponse(data, val)

    store.get('user_id').then((val) => {
      console.log('store', val);
      this.DS.seturl("https://ffserver.eu-gb.mybluemix.net/check-version?version=2");
      this.DS.load().subscribe(
        data => (this.handelResponse(data, val))
      );

    });
    // deeplinks.route({
    //   '/about-us': LoginPage,
    //   '/company':CompanyPage
    // }).subscribe((match) => {
    //   // match.$route - the route we matched, which is the matched entry from the arguments to route()
    //   // match.$args - the args passed in the link
    //   // match.$link - the full link data
    //   console.log('Successfully matched route', match);
    // }, (nomatch) => {
    //   // nomatch.$link - the full link data
    //   console.error('Got a deeplink that didn\'t match', nomatch);
    // });
  }
 
  ngOnInit() {

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

  
  }

  handelResponse(data, user_id) {
    this.check = data.result;
    console.log(this.check);
    if (!this.check) {
      // this.rootPage = VersionCheckPage;
      this.rootPage = VersionCheckPage;
    }
    if (user_id == null || user_id == "") {
      this.rootPage = LoginPage;
    }
    else {
      if (user_id == 324)
        this.rootPage = TabsPage;
      else {
        if (user_id==324) 
            this.rootPage=TabsPage;
       else {
              
            this.store.get('tutorial').then((val) => {
                  if(val ==null)
                    this.rootPage= TutorialPage;
                  else 
                    this.rootPage= TabsPage;
            });
                          
       }
      }
    }

  }


  // checkTimer (callback : (TimerWorking : boolean) => void){

  //   this.DS.seturl("https://ffserver.eu-gb.mybluemix.net/check-date-test");
  //       this.DS.load().subscribe(
  //           data =>{
  //             console.log("hello" , data.result); 
  //             callback (data.result) ; 
  //             });





  // }
}

