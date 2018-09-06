import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthErrorHandler } from './services/auth/auth-error-handler';
import { AuthService } from './services/auth/auth.service';
import * as fromPublicService from '../services';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FileDropZoneComponent } from './components/file-drop-zone/file-drop-zone.component';
import { DeleteProductConfirmDialogComponent } from './components/delete-product-confirm-dialog/delete-product-confirm-dialog.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

import { DashboardModule } from './components/dashboard/dashboard.module';

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
    loadChildren: '../dashboard/dashboard.module#DashboardModule'
  }
];

const appInitializerFn = (appConfig: fromPublicService.AppConfigService) => {
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
    FileDropZoneComponent

  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(ROUTES),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature([ProductEffects]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    DashboardModule,
  ],
  providers: [
    AuthService,
    fromPublicService.HttpCallsService,
    fromPublicService.AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [fromPublicService.AppConfigService]
    },
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
