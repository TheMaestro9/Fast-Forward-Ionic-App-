import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardPaymentPage } from './card-payment';

@NgModule({
  declarations: [
    CardPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(CardPaymentPage),
  ],
  exports: [
    CardPaymentPage
  ]
})
export class CardPaymentPageModule {}
