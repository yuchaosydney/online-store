import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';

import { productReducer } from '../../reducers/products.reducer';

import { DashboardComponent } from './dashboard.component';

import { routes } from '../../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthComponent } from '../auth/auth.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ModalModule.forRoot(),
        StoreModule.forRoot({products: productReducer}),
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [ DashboardComponent, AuthComponent ],
      providers: [ BsModalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
