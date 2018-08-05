import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRequestOptions } from './services/auth/auth-request';
import { AuthErrorHandler } from './services/auth/auth-error-handler';
import { AuthService } from './services/auth/auth.service';
import { ProductsService } from './services/product/products.service';
import { FileService } from './services/file/file.service';
import { HttpCallsService } from './services/http-calls/http-calls.service';

// bootstrap stuff
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { ProductEffects } from './store/effects/product.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FileDropZoneComponent } from './components/file-drop-zone/file-drop-zone.component';
import { DeleteProductConfirmDialogComponent } from './components/delete-product-confirm-dialog/delete-product-confirm-dialog.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

import { reducers } from './store';

// guards
import * as fromGuards from './guards';
import { AuthGuard } from './services/auth/auth.guard';

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

export const ROUTES: Routes = [
  {
    'path': 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, fromGuards.ProductsGuard]},
  {
    'path': 'login',
    component: AuthComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductFormComponent,
    DeleteProductConfirmDialogComponent,
    DashboardComponent,
    FileDropZoneComponent
  ],
  entryComponents: [ProductFormComponent, DeleteProductConfirmDialogComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature([ProductEffects]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    AuthService,
    AuthGuard,
    ProductsService,
    FileService,
    HttpCallsService,
    {
      provide: RequestOptions,
      useClass: AuthRequestOptions
    },
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    },
    fromGuards.guards
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
