import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AuthRequestOptions } from './services/auth/auth-request';
import { AuthErrorHandler } from './services/auth/auth-error-handler';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { ProductsService } from './services/product/products.service';
import { FileService } from './services/file/file.service';
import { HttpCallsService } from './services/http-calls/http-calls.service';

// bootstrap stuff
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeleteProductConfirmDialogComponent } from './components/delete-product-confirm-dialog/delete-product-confirm-dialog.component';

import { StoreModule } from '@ngrx/store';
import { productReducer } from './reducers/products.reducer';
import { ProductEffects } from './effects/product.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FileDropZoneComponent } from './components/file-drop-zone/file-drop-zone.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    ProductFormComponent,
    DeleteProductConfirmDialogComponent,
    DashboardComponent,
    FileDropZoneComponent
  ],
  entryComponents: [ProductFormComponent, DeleteProductConfirmDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    StoreModule.forRoot({products: productReducer}),
    EffectsModule.forRoot([ProductEffects]),
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
