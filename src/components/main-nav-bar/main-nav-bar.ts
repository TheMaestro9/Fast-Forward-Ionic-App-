import { Component } from '@angular/core';

/**
 * Generated class for the MainNavBarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'main-nav-bar',
  templateUrl: 'main-nav-bar.html'
})
export class MainNavBarComponent {

  currentColor;

  constructor() {
    console.log('Hello MainNavBarComponent Component');
    this.currentColor="danger"
  }

}
