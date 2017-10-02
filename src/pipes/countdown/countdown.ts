import { Pipe, PipeTransform } from '@angular/core';



  

/**
 * Generated class for the CountdownPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'countdown',
})
export class CountdownPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(klam) {
   
    return "klam"+"1";
    
  }
}
