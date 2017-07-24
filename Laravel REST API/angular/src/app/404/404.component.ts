import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'error-404-wrapper',
  templateUrl: '404.component.html',
})

/**
* Export UserComponent
* Defines a list of users, their information, and their hobbies.
*/
export class PageNotFoundComponent  {
  title: string;
  message: string;

  // user info constructor
  constructor() {
    this.title = 'Error';
    this.message = 'Opps! Somehow you\'ve found an error page.';
  } // END of constructor

} // END of UserCom
