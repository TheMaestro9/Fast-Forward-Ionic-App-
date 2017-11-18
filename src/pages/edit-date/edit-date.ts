import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditDatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit-date',
  templateUrl: 'edit-date.html',
})
export class EditDatePage {

  dateToEdit: string;
  timeToEdit: any;
  simIdToEdit: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.simIdToEdit = this.navParams.data.simID;
    console.log(this.navParams.data.simDate)
  }


  trimDateForEditing(){
    var res = this.navParams.data.simDate.split("at");
    this.dateToEdit = new Date (res[0]).toISOString();
    this.timeToEdit = res[1];
    //var date= new Date 
  }
}
