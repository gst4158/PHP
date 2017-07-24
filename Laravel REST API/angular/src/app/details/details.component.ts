// Core
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Services
import { detailsService }   from './details.service';

@Component({
    moduleId: module.id,
    selector: 'details-wrapper',
    templateUrl: 'details.html',
    providers: [detailsService],
})

/**
* Export detailsComponent
* Defines a list of movie theater locations by movie name/slug
*/
export class detailsComponent {
    // constructor Parts & Default Variables
    //===========================================//
    // post constructor
    constructor(
        private detailsService: detailsService,
    ) { } // END of constructor


} // END of detailsComponent
