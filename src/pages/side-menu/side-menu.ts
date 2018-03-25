import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform  , Nav} from 'ionic-angular';
import {VrVideoPage} from '../vr-video/vr-video'; 
import {StatusBar} from '@ionic-native/status-bar' 

/**
 * Generated class for the SideMenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-side-menu',
  templateUrl: 'side-menu.html',
})
export class SideMenuPage {
  @ViewChild(Nav) nav : Nav ; 
  rootPage : any = VrVideoPage ; 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
     public statusBar : StatusBar , public platform: Platform) {
       this.initializeApp() ; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SideMenuPage');
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault() ;
    });
  }

}
