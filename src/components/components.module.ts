import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MediaSampleItemComponent } from './media-sample-item/media-sample-item';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	declarations: [MediaSampleItemComponent],
	imports: [
		IonicModule.forRoot(MediaSampleItemComponent),
		PipesModule
	],
	exports: [MediaSampleItemComponent]
})
export class ComponentsModule {}
