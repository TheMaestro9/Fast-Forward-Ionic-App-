import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the RatingPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'rating',
})
export class RatingPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value) {
    if (value=="-1"){
      value="-";
    }
    return value;
  }
}
