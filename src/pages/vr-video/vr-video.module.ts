import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VrVideoPage } from './vr-video';

@NgModule({
  declarations: [
    VrVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(VrVideoPage),
  ],
  exports: [
    VrVideoPage
  ]
})
export class VrVideoPageModule {}
