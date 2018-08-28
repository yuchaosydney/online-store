import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthErrorHandler } from './services/auth/auth-error-handler';
import { AuthService } from './services/auth/auth.service';
import { ProductsService } from './services/product/products.service';
import { FileService } from './services/file/file.service';
import { HttpCallsService } from './services/http-calls/http-calls.service';
import { AppConfigService } from './services';

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
    'path': 'login',
    component: AuthComponent
  },
  {
    'path': 'dashboard',
    component: DashboardComponent,
    canActivate: [fromGuards.AuthGuard, fromGuards.ProductsGuard]
  }
];

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
      return appConfig.loadAppConfig();
  };
};

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
    HttpClientModule,
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
    ProductsService,
    FileService,
    HttpCallsService,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
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
