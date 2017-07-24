import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './404/404.component';
import { BlueStarComponent } from './bluestar/bluestar.component';

const appRouters: Routes = [
    // base route
    { path: '', component: BlueStarComponent },

    // 404 router
    //{ path: '404', component: PageNotFoundComponent },
    { path: '**', component: PageNotFoundComponent /*redirectTo: '/404'*/ }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRouters);
