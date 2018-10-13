import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DeleteProductConfirmDialogComponent } from './delete-product-confirm-dialog.component';

import { reducers } from '../../store/reducers';

describe('DeleteProductConfirmDialogComponent', () => {
  let component: DeleteProductConfirmDialogComponent;
  let fixture: ComponentFixture<DeleteProductConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('products', reducers)
      ],
      declarations: [ DeleteProductConfirmDialogComponent ],
      providers: [BsModalRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProductConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
