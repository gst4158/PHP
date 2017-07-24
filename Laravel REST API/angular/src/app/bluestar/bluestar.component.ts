// Core
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import 'rxjs/Rx';
import 'rxjs/operator/finally';

// includes
import { postVars } from './_postVars';

// Services
import { BlueStarService }   from './bluestar.service';

@Component({
    moduleId: module.id,
    selector: 'bluestar-wrapper',
    templateUrl: 'bluestar.html',
    providers: [BlueStarService],
})

/**
* Export BlueStarComponent
* Displays a list of post pulled via api from database
*/
export class BlueStarComponent {
    // constructor Parts & Default Variables
    //===========================================//
    // post constructor
    constructor(
        private BlueStarService: BlueStarService,
        private router: Router,
        private route: ActivatedRoute,
        private ElementRef: ElementRef,
        private FormsModule: FormsModule
    ) { } // END of constructor

    // default variables
    posts: postVars[];
    updateRowTxt: string;
    row: any;

    // Get jSON information
    //===========================================//
    // retrieve post data
    getPosts(): void {
      this.BlueStarService.getPosts()
        .finally(() => {
          console.log('Post list:', this.posts);
        })
        .subscribe(
          (posts) => {
            this.posts = posts;
          },
          (error) => {
            this.handleError(error);
          }
        );
    }

    // runs one time at start
    ngOnInit(): void {
      this.getPosts();
    }

    // Functions
    //===========================================//
    // move item orderby up (smaller number)
    sortPost(post, event, direction) {
      this.BlueStarService.sortPost(post, event, direction)
      // display message
      .finally(() => {
        let $target = document.getElementsByClassName("message-success");
        this.showMessages($target[0], 'A post with the text, "'+post.text+'" has been updated', ['messages', 'active', 'message-green']);
      })
      // update post
      .subscribe(
        (posts) => {
          this.posts = posts;
        },
      );
    }

    // removes item from database
    removePost(post, event): void {
      // display message
      var $target = event.target || event.srcElement || event.currentTarget;
      var $target = $target.closest('.post-wrapper').getElementsByClassName("message-error");
      this.showMessages($target[0], 'Post has been removed', ['messages', 'active', 'message-red']);

      // remove post
      this.BlueStarService.removePost(post, event);
    }

    // creates new item for database
    createPost(name): void {
      this.BlueStarService.createPost(name)
      // display message
      .finally(() => {
        let $target = document.getElementsByClassName("message-success");
        this.showMessages($target[0], 'A post has been created', ['messages', 'active', 'message-green']);
      })
      //create new post
      .subscribe(
        (row) => {
          let newPost = row[0];
          this.posts.push(newPost);
        },
      );
    }

    // piggy-backs off updatePost to send new text value
    captureText(value) {
      this.updateRowTxt = value;
    }

    // updates text on row
    updatePost(post, event,): void {
      this.BlueStarService.updatePost(post, this.updateRowTxt, event,)
      // display message
      .finally(() => {
        let $target = document.getElementsByClassName("message-success");
        this.showMessages($target[0], 'A post has been updated', ['messages', 'active', 'message-green']);
      })
      //create new post
      .subscribe(
        (row) => {

        },
      );
    }

    // adds class on clicked element
    showMessages(element, string, classname): void {
      // create new element
      var newElem = document.createElement('span');

      // add classes to new element
      for(var i = 0; i <= classname.length; i++) {
        newElem.classList.add(classname[i]);
      }

      // add string content
      newElem.innerHTML = string;

      // append new element
      element.append(newElem);

    }

    // Error Handling
    //===========================================//
    // prints a console log error on post get
    private handleError(error) {
        console.error('An error occurred', error);
        //this.showFilter = false;
        return error.message || error;
    }


} // END of BlueStarComponent
