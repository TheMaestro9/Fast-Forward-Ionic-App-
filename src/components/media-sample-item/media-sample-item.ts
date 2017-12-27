import { Component, Input } from '@angular/core';

@Component({
  selector: 'media-sample-item',
  templateUrl: 'media-sample-item.html'
})
export class MediaSampleItemComponent {

  @Input() mediaSample;

  constructor() {}

}
