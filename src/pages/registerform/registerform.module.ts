import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Registerform } from './registerform';

@NgModule({
  declarations: [
    
  ],
  imports: [
    IonicPageModule.forChild(Registerform),
  ],
  exports: [
    Registerform
  ]
})
export class RegisterformModule {}
