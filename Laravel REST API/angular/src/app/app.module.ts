import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }           from './app.component';
import { routing }                from './app.routing';
import { PageNotFoundComponent }  from './404/404.component';
import { BlueStarComponent }     from './bluestar/bluestar.component';
import { detailsComponent }     from './details/details.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [ AppComponent, PageNotFoundComponent, BlueStarComponent, detailsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
