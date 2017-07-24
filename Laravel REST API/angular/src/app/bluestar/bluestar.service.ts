import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

// includes
import { postVars } from './_postVars';
/**
* Export BlueStarService
* Retrieves a jSON feed and does stuff with it
*/
@Injectable()
export class BlueStarService {
    // private vars
    headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
      'Allow': 'POST, GET, PUT, OPTIONS, DELETE, OPTIONS',

    });
    private JSONUrl = 'http://bluestar.gregorythomason.com/backend/api/app_sorting';  // URL to web api

    constructor(
      private http: Http,
    ) { }

    // Get jSON information
    //===========================================//
    // Get all post
    getPosts() {
      return this.http.get( this.JSONUrl )
        .map( response => response.json() as postVars[] )
    }

    // Create a new post
    createPost(text: string): Observable<postVars[]> {
      return this.http.post(this.JSONUrl + '/post/' + text, this.headers)
        .map( response => response.json() as postVars[] )
    }

    // update post order
    updatePost(post, newText, event): Observable<postVars[]> {
      return this.http.post(this.JSONUrl + '/update/' + post.id + '/' + newText, this.headers)
        .map( response => response.json() as postVars[] )
    }

    // update post order
    sortPost(post, event, direction): Observable<postVars[]> {
      return this.http.post(this.JSONUrl + '/sort/' + post.id + '/' + direction, this.headers)
        .map( response => response.json() as postVars[] )
    }

    // Removtes post from DB
    removePost(post, event): Promise<void> {
        // remove element from dom
        var $target = event.target || event.srcElement || event.currentTarget;
        $target.closest('.post').remove();

        // remove item from DB
        return this.http.delete(this.JSONUrl + '/delete/' + post.id, this.headers)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    // Error Handling
    //===========================================//
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    // Functions
    //===========================================//



}
