import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { ProductFormComponent } from './product-form.component';
import { FileDropZoneComponent } from '../file-drop-zone/file-drop-zone.component';

import { reducers } from '../../store/reducers';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import * as fromServices from '../../services';
import * as fromPublicService from '../../../services';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ModalModule,
        HttpModule,
        ProgressbarModule.forRoot(),
        StoreModule.forRoot({}),
        StoreModule.forFeature('products', reducers)
      ],
      declarations: [ ProductFormComponent, FileDropZoneComponent ],
      providers: [
        BsModalRef,
        ...fromServices.services,
        ...fromPublicService.services
      ]
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
