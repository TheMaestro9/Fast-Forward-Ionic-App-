import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptapplicantsPage } from './acceptapplicants';

@NgModule({
  declarations: [
    AcceptapplicantsPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptapplicantsPage),
  ],
  exports: [
    AcceptapplicantsPage
  ]
})
export class AcceptapplicantsPageModule {}
