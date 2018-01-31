import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PremiumPackagesPage } from './premium-packages';

@NgModule({
  declarations: [
    PremiumPackagesPage,
  ],
  imports: [
    IonicPageModule.forChild(PremiumPackagesPage),
  ],
  exports: [
    PremiumPackagesPage
  ]
})
export class PremiumPackagesPageModule {}
