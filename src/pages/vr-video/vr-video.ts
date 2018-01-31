import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { MediaSampleModel } from '../../models/media-sample.model';
import { ApiProvider } from '../../providers/api/api';
import { VrViewProvider } from '../../providers/vr-view/vr-view';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
//import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-vr-video',
  templateUrl: 'vr-video.html',
})
export class VrVideoPage {
  mediaSamples: Array<MediaSampleModel> = [];
  errorMessage: string;
  isLoading: boolean;
  settingsColor;
  videoQuality;
  rate;
  timer;
  userId;
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
        console.log("the quality Data", data);
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
        },
        error => {
          this.isLoading = false;
          this.errorMessage = error;
        }
        );
    });
  }

  starClicked(value) {
    console.log("Rated :", value);
    this.rate = value;
    this.showToast();
    console.log("Rate : ", this.rate);
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
              var info = {
                user_id: this.userId,
                vr_video_id: mediaSampleElement.video_id
              }
              this.http.post("https://ffserver.eu-gb.mybluemix.net/unlock-video", info).subscribe(data => {
                var res = JSON.parse(data['_body']);
                if (res.success)
                  mediaSampleElement.locked = false;
                else
                  alert(res.msg);
              });
//              var currentTime = new Date();
//              this.addTimer(currentTime.setMinutes(currentTime.getMinutes() + mediaSampleElement.duration), mediaSampleElement)
            }
          }
        ]
      });
      confirm.present();
    }
    else {
      this.vrView.playMediaSample(mediaSampleElement);
    }
  }

  showToast() {
    var toastOptions = {
      message: "Thank you for your rating!",
      duration: 3000
    };
    this.toast.create(toastOptions).present()
  }
  addTimer(date, Video) {

    // console.log("in add timer",date)
    Video.videoExpDate = new Date(date)
    // console.log('date',this.StartDate);
    Video.videoExpDate.setMilliseconds(0);
    this.timer = Observable.interval(1000).subscribe(x => {
      this.timercal(Video);
    });

  }
  timercal(Video) {
    let dump = new Date();
    //	dump.setHours(dump.getHours()-2); 
    //this.StartDate = new Date(dump.getTime() + 24 * 60 * 60 * 1000);
    //	console.log("INNNN",this.StartDate);
    dump.getTimezoneOffset();
    let diff = Video.videoExpDate.getTime() - dump.getTime();
    //	var timeDiff = Math.abs(diff);
    let timeDiff = diff;
    if (timeDiff < 0) {
      this.timer.unsubscribe();
      return;
    }
    var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    var diffhours = Math.floor((timeDiff - diffDays * 1000 * 3600 * 24) / (1000 * 3600));
    Video.diffmins = Math.floor(((timeDiff - diffDays * 1000 * 3600 * 24) - diffhours * 1000 * 3600) / (1000 * 60));
  }

  Recharge () {

    alert("welcome to premium "); 
  
  }
}
