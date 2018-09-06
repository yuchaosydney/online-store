import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// bootstrap stuff
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import * as fromComponents from './components';
import * as fromServices from './services';

// guards
import * as fromPublicGuards from '../guards';
import * as fromGuards from './guards';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromComponents.DashboardComponent,
    canActivate: [fromPublicGuards.AuthGuard, fromGuards.ProductsGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [...fromComponents.components],
  providers: [
    ...fromGuards.guards,
    ...fromPublicGuards.guards,
    ...fromServices.services
  ],
  entryComponents: [fromComponents.ProductFormComponent]
})
export class DashboardModule { }
