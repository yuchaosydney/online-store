import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { AuthRequestOptions } from './services/auth/auth-request';
import { ErrorHandler } from '@angular/core/src/error_handler';
import { AuthErrorHandler } from './services/auth/auth-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule
  ],
  providers: [
    {
      provide: RequestOptions,
      useClass: AuthRequestOptions
    },
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
