import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the AddPackagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-package',
  templateUrl: 'add-package.html',
})
export class AddPackagePage {

  packages;
  pack;
  userEmail;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController
  ) {

    this.http.get("https://ffserver.eu-gb.mybluemix.net/get-packages").subscribe(data => {
      var res = JSON.parse(data['_body']);
      this.packages = res;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPackagePage');
  }

  AddToUserWallet() {

    console.log(this.pack) ; 
    this.http.get("https://ffserver.eu-gb.mybluemix.net/get-user-name?user_email="+this.userEmail).subscribe(data => {
      var res = JSON.parse(data['_body']);
      let confirm = this.alertCtrl.create({
        title: 'Confirm',
        message:
          "Are You Sure Want To add "+ this.pack +" unlocks to \" " + res.user_name+ "\"" ,
        buttons: [
          { text: 'No', role: 'cancel', },
          {
            text: 'Yes',
            handler: () => {
              
              var updateDetails = { 

                user_id : res.user_id , 
                wallet : this.pack 
              }
              this.http.post("https://ffserver.eu-gb.mybluemix.net/add-to-user-wallet", updateDetails).subscribe(data => {
                  var res2 = JSON.parse(data['_body']);
                  if (res2.success == false)
                    alert (res.msg); 
              });
            }
          }
        ]
      });
      confirm.present();
    })


  }
}