import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { ProductFormComponent } from './product-form.component';
import { FileDropZoneComponent } from '../file-drop-zone/file-drop-zone.component';

import { productReducer } from '../../reducers/products.reducer';

import { ModalModule } from 'ngx-bootstrap/modal';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService } from '../../services/auth/auth.service';
import { HttpCallsService } from '../../services/http-calls/http-calls.service';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({products: productReducer}),
        ModalModule,
        HttpModule
      ],
      declarations: [ ProductFormComponent, FileDropZoneComponent ],
      providers: [ BsModalRef, AuthService, HttpCallsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
