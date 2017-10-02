import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimulationsListPage } from './simulations-list';

@NgModule({
  declarations: [
    
  ],
  imports: [
    IonicPageModule.forChild(SimulationsListPage),
  ],
  exports: [
    SimulationsListPage
  ]
})
export class SimulationsListModule {}
