import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {videojs} from 'video.js' ; 
import {panorama} from 'videojs-panorama' ; 
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
  }
  constructor(public navCtrl: NavController, public navParams: NavParams  ) {

  //  console.log("ya mannn") ; 
//    console.log(videojs) ; 

  }

  // initializePlayer(){
  //   var  videoInfo  = this.props;
  //   var videoElement = this.player;

  //   this.player = videojs(videoElement, {} , () => {
  //       window.addEventListener("resize", () => {
  //           var canvas = this.player.getChild('Canvas');
  //           if(canvas) canvas.handleResize();
  //       });
  //   });

  //   this.player.poster(videoInfo.imageURL);
  //   this.player.src({src: videoInfo.videoURL, type: "video/mp4" });

  //   var width = videoElement.offsetWidth;
  //   var height = videoElement.offsetHeight;
  //   this.player.width(width), this.player.height(height);
  //   panorama(this.player, {
  //       clickToToggle: (false),
  //       autoMobileOrientation: true,
  //       initFov: 100,
  //       VREnable: true,
  //       clickAndDrag: true,
  //       NoticeMessage: (true)? "please drag and drop the video" : "please use your mouse drag and drop the video"
  //   });

  //   this.player.on("VRModeOn", function(){
  //       this.player.controlBar.fullscreenToggle.trigger("tap");
  //   });
//}
  ngOnInit() {

   // this.initializePlayer()
      
  }    
  ionViewDidLoad() {
    console.log('ionViewDidLoad VrVideoPage');
  }

}
