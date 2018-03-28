import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';
import { MediaSampleItemComponent } from './media-sample-item/media-sample-item';
import {MainNavBarComponent} from './main-nav-bar/main-nav-bar'
@NgModule({
	declarations: [MediaSampleItemComponent],
	imports: [
		IonicModule.forRoot(MediaSampleItemComponent),
		PipesModule, 
	],
	exports: [MediaSampleItemComponent ]
})
export class ComponentsModule {}
