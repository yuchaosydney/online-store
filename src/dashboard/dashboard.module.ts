import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// guards
import * as fromGuards from './guards';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [fromGuards.AuthGuard, fromGuards.ProductsGuard]
  }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    fromGuards.guards
  ]
})
export class DashboardModule { }
