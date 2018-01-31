import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPackagePage } from './add-package';

@NgModule({
  declarations: [
    AddPackagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPackagePage),
  ],
  exports: [
    AddPackagePage
  ]
})
export class AddPackagePageModule {}
