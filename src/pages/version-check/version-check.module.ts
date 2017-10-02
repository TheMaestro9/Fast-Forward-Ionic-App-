import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VersionCheckPage } from './version-check';

@NgModule({
  declarations: [
   
  ],
  imports: [
    IonicPageModule.forChild(VersionCheckPage),
  ],
  exports: [
    VersionCheckPage
  ]
})
export class VersionCheckPageModule {}
