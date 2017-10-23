import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerPage } from './timer';

@NgModule({
  declarations: [

  ],
  imports: [
    IonicPageModule.forChild(TimerPage),
  ],
  exports: [
    TimerPage
  ]
})
export class TimerPageModule {}
