import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MainNavBarComponent } from './main-nav-bar';

@NgModule({
  declarations: [
    MainNavBarComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    MainNavBarComponent
  ]
})
export class MainNavBarComponentModule {}
