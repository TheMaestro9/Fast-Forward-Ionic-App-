import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the VersionCheckPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-version-check',
  templateUrl: 'version-check.html',
})
export class VersionCheckPage {
  check ; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController ) {
  }

 

}
