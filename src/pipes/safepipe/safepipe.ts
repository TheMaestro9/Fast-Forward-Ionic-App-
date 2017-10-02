import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer} from '@angular/platform-browser';
/**
 * Generated class for the SafepipePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'safe',
})
export class SafepipePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(private sanitizer: DomSanitizer){}
  transform(url) {
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
