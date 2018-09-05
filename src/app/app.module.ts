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
import { ProductsService } from './services/product/products.service';
import { FileService } from './services/file/file.service';
import { HttpCallsService } from './services/http-calls/http-calls.service';
import { AppConfigService } from './services';

// bootstrap stuff
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
      return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
