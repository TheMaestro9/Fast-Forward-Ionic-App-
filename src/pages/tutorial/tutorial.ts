import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import {  NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';




export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  ios: boolean = false;

  constructor(public navCtrl: NavController,public plt: Platform,private store: Storage) {
    console.log("y",localStorage.getItem('expo'));
    
    if (plt.is('ios')) {
      this.ios = true;
    }
        this.slides = [
          {
            title: "Profession",
            description: "Choose a profession you are interested in..",
            image: 'assets/tut1.png',
          },
          {
            title: "Simulation/Company",
            description: "Choose a simulation you want to try out..",
            image: 'assets/tut2.png',
          },
          {
            title: "Finish up",
            description: "Check out the company profile, apply, and book your simulation..",
            image: 'assets/tut3.png',
          },
        ];
  }

  startApp() {
    this.store.set('tutorial', "Yes");
    this.navCtrl.setRoot(TabsPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    // this.menu.enable(false);
  }


}