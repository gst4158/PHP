import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

/**
* Export detailsService
* Retrieves a jSON feed and does stuff with it
*/
@Injectable()
export class detailsService {
    constructor(
      private http: Http,
    ) { }


}
