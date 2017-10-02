import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpotimerPage } from './expotimer';

@NgModule({
  declarations: [
    ExpotimerPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpotimerPage),
  ],
  exports: [
    ExpotimerPage
  ]
})
export class ExpotimerPageModule {}
