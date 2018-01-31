import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { MediaSampleModel } from '../../models/media-sample.model';
import { ApiProvider } from '../../providers/api/api';
import { VrViewProvider } from '../../providers/vr-view/vr-view';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { PremiumPackagesPage } from '../premium-packages/premium-packages'

//import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-vr-video',
  templateUrl: 'vr-video.html',
})
export class VrVideoPage {
  // mediaSamples: Array<MediaSampleModel> = [];
  mediaSamples;
  errorMessage: string;
  isLoading: boolean;
  settingsColor;
  videoQuality;
  rate;
  timer;
  userId;
  wallet;
  toBePlayed: MediaSampleModel;
  constructor(
    public navCtrl: NavController,
    public api: ApiProvider,
    public vrView: VrViewProvider,
    public alertController: AlertController,
    public toast: ToastController,
    public store: Storage,
    public http: Http
  ) {

    this.settingsColor = "grey";
    this.videoQuality = "High";
    this.rate = 3;
  }

  ionViewDidLoad() {
    this.loadMediaSamples();
  }
  ionViewWillEnter() { 
    //console.log("ya man msh kda , " , this.userId ) ; 
    if (typeof(this.userId)!='undefined'){ 
    this.http.get("https://ffserver.eu-gb.mybluemix.net/vr-user-info?user_id=" + this.userId).subscribe(data => {
      var res = JSON.parse(data['_body']);
      this.wallet = res.wallet;

    })
  }
  }

  selectQuality() {

    let alert = this.alertController.create();
    alert.setTitle('Choose Quality');
    alert.addInput({
      type: 'radio',
      label: "High Qulity",
      value: "High",
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: "Mideum Qulity",
      value: "Low",
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.videoQuality = data;
      }
    });
    alert.present();
  }
  loadMediaSamples() {

    this.isLoading = true;
    this.store.get('user_id').then((val) => {
      this.userId = val;
      this.api.getMediaSamples(val)
        .subscribe(
        mediaSamples => {

          this.isLoading = false;
          this.mediaSamples = mediaSamples;
          this.errorMessage = null;
          this.reloadUnlockTimers();
        },
        error => {
          this.isLoading = false;
          this.errorMessage = error;
        }
        );

      this.http.get("https://ffserver.eu-gb.mybluemix.net/vr-user-info?user_id=" + val).subscribe(data => {
        var res = JSON.parse(data['_body']);
        this.wallet = res.wallet;

      })
    });
  }

  reloadUnlockTimers() {



    this.mediaSamples.forEach(video => {
      if (!video.locked)
        this.addTimer(video);
    });

  }

  starClicked(value, video) {
    var ratingDetails = {
      rate: value,
      user_id: this.userId,
      vr_video_id: video.video_id
    }
    console.log("in Rating", ratingDetails);
    this.http.post("https://ffserver.eu-gb.mybluemix.net/rate-vr-video", ratingDetails).subscribe(data => {
      var res = JSON.parse(data['_body']);
      if (res.success == false)
        alert(res.msg);
      else
        this.showToast();

    });
    return value;
  }
  onMediaSampleitemClick(mediaSampleElement) {
    if (mediaSampleElement.locked) {
      let confirm = this.alertController.create({
        title: 'Confirm',
        message:
          'Are You Sure Want To Unlock This Video?!',
        buttons: [
          { text: 'No', role: 'cancel', },
          {
            text: 'Yes',
            handler: () => {
              this.unlockVideo(mediaSampleElement);
            }
          }
        ]
      });
      confirm.present();
    }
    else {
      var toBePlayed = {
        "name": mediaSampleElement.video_name,
        "type": "VIDEO",
        "inputType": "TYPE_MONO",
        "inputFormat": mediaSampleElement.inputFormat,
        "url": mediaSampleElement.url,
        "isLocal": false,
        "previewUrl": mediaSampleElement.preview_url,
      }

      // var toBePlayed = {
      //   "name": "Playhouse",
      //   "type": "VIDEO",
      //   "inputType": "TYPE_MONO",
      //   "inputFormat": "FORMAT_HLS",
      //   "url": "https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8",
      //   "isLocal": false,
      //   "previewUrl":"https://cordovavrview.tangodev.it/resources/playhouse_preview.jpg",
      //   "locked": true 
      // }


      // var toBePlayed = {
      //   "name": "Playhouse",
      //   "type": "VIDEO",
      //   "inputType": "TYPE_MONO",
      //   "inputFormat": "FORMAT_HLS",
      //   "url": "https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8",
      //   "isLocal": false,
      //   "previewUrl": "https://cordovavrview.tangodev.it/resources/playhouse_preview.jpg"
      // }

      console.log(toBePlayed);
      this.vrView.playMediaSample(toBePlayed);
    }
  }

  unlockVideo(mediaSampleElement) {
    var info = {
      user_id: this.userId,
      vr_video_id: mediaSampleElement.video_id
    }
    this.http.post("https://ffserver.eu-gb.mybluemix.net/unlock-video", info).subscribe(data => {
      var res = JSON.parse(data['_body']);
      if (res.success) {
        mediaSampleElement.locked = false;
        var unlockDate = new Date();
        mediaSampleElement["unlock_date"] = unlockDate;
        this.addTimer(mediaSampleElement)
      }
      else
        alert(res.msg);
    });
  }

  showToast() {
    var toastOptions = {
      message: "Thank you for your rating!",
      duration: 3000
    };
    this.toast.create(toastOptions).present()
  }
  addTimer(Video) {
    Video.timer = Observable.interval(1000).subscribe(x => {
      this.timercal(Video);
    });
  }
  timercal(Video) {
    let dump = new Date();

    dump.getTimezoneOffset();
    var videoExpDate = new Date(Video.unlock_date);
    videoExpDate.setMinutes(videoExpDate.getMinutes() + Video.duration)
    let diff = videoExpDate.getTime() - dump.getTime();
    let timeDiff = diff;
    if (timeDiff < 0) {
      Video.timer.unsubscribe();
      Video.locked = true;
      return;
    }
    var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    var diffhours = Math.floor((timeDiff - diffDays * 1000 * 3600 * 24) / (1000 * 3600));
    Video.diffmins = Math.floor(((timeDiff - diffDays * 1000 * 3600 * 24) - diffhours * 1000 * 3600) / (1000 * 60));
  }

  Recharge() {

    alert("welcome to premium ");
    this.navCtrl.push(PremiumPackagesPage);
  }
}
