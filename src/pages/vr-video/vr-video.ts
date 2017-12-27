import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VrVideoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vr-video',
  templateUrl: 'vr-video.html',
})
export class VrVideoPage {
  player = null ; 
  props ={
    "imageURL":"assets/ff.png" , 
    "videoURL":"assets/piano.MP4"
  } ; 

   mediaSamples = [
    {
      name: "Playhouse",
      type: "VIDEO",
      inputType: "TYPE_MONO",
      inputFormat: "FORMAT_HLS",
      url: "https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8",
      isLocal: false,
      previewUrl: "https://cordovavrview.tangodev.it/resources/playhouse_preview.jpg"
    }
    ];    
  constructor(public navCtrl: NavController, public navParams: NavParams  ) {

    
  //  console.log("ya mannn") ; 
//    console.log(videojs) ; 

   console.log("ana hena")
  }
  ngOnInit() {

   // this.initializePlayer()

   console.log("ana henak" , this.mediaSamples)
      
  }    
  ionViewDidLoad() {
    console.log('ionViewDidLoad VrVideoPage');
  }
  onMediaSampleitemClick(mediaSampleElement) {    
    console.log("im here dude") ; 
    window['VrView'].playVideo(
    mediaSampleElement.url, 
    mediaSampleElement.inputType, 
    mediaSampleElement.inputFormat
  );
}

}
