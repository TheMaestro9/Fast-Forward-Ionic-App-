import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("da ell " ,navParams);
  }


}
