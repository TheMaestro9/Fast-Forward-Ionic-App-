import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { MediaSampleModel } from '../../models/media-sample.model';
import { ApiProvider } from '../../providers/api/api';
import { VrViewProvider } from '../../providers/vr-view/vr-view';

@Component({
  selector: 'page-vr-video',
  templateUrl: 'vr-video.html',
})
export class VrVideoPage {
  mediaSamples : Array<MediaSampleModel> = [];
  errorMessage : string;
  isLoading: boolean;

  constructor(
    public navCtrl: NavController,
    public api: ApiProvider,
    public vrView: VrViewProvider
  ) {}

  ionViewDidLoad() {
    this.loadMediaSamples();
  }

  loadMediaSamples() {
    this.isLoading = true;
    this.api.getMediaSamples()
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
  }

  onMediaSampleitemClick(mediaSampleElement) {
    this.vrView.playMediaSample(mediaSampleElement);
  }

}
