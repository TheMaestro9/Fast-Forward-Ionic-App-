import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Applicants } from '../applicants/applicants';
import { Requestdate } from '../requestdate/requestdate';
import { Registerform } from '../registerform/registerform';
import { TabsPage } from '../tabs/tabs';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
  check = true;
  splash = true; // new 

  constructor(public navCtrl: NavController, private fb: Facebook, private sharefb: SocialSharing) {


  }
  //new 
  ionViewDidLoad() {
    //this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      //  this.tabBarElement.style.display = 'flex';
    }, 4000);
  }


  nav() {
    /*if(us!=null && pw!=null){
    this.DS.seturl("https://ffserver.eu-gb.mybluemix.net/login?user_name="+us+"&password="+pw);
    this.DS.load().subscribe(
                data => (this.check=data)
                
            );*/
    if (this.check) {
      this.navCtrl.pop;
      this.navCtrl.push(TabsPage);

    }/*}
else{

  this.showAlert();
}
}*/

  }




  loginfacebook() {

    this.fb.login(['email', 'user_birthday']).then((response) => {

      alert('Logged in');
      // alert(JSON.stringify(response.authResponse))
    }, (error) => { alert(error) })
  }

  get_details() {
    this.fb.getLoginStatus().then((response) => {
      if (response.status == 'connected') {
        this.fb.api('/' + response.authResponse.userID + '?fields=id,name,gender,user_birthday', []).then((response) => {
          alert(JSON.stringify(response))
        }, (error) => { alert(error) })
      }
      else {
        alert('not logged in');
      }


    })

  }
  applicantnav() {
    this.navCtrl.push(Applicants);
  }





  logout() {
    this.fb.logout().then((response) => {

      alert('Logged out');
      alert(JSON.stringify(response.authResponse))
    }, (error) => { alert(error) })



  }






  share() {
    this.sharefb.share("sharing text", null, null, null).then((response) => {

      //alert('vedio is shared');
      alert(JSON.stringify(response.authResponse))
    }, (error) => { alert(error) })





  }
  reqdate() {

    this.navCtrl.push(Requestdate);

  }
  form() {
    this.navCtrl.push(Registerform);


  }


}

