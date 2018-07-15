import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { productReducer } from '../../reducers/products.reducer';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DeleteProductConfirmDialogComponent } from './delete-product-confirm-dialog.component';

describe('DeleteProductConfirmDialogComponent', () => {
  let component: DeleteProductConfirmDialogComponent;
  let fixture: ComponentFixture<DeleteProductConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({products: productReducer}),
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
