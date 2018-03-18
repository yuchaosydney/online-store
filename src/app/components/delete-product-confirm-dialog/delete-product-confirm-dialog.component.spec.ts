import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductConfirmDialogComponent } from './delete-product-confirm-dialog.component';

describe('DeleteProductConfirmDialogComponent', () => {
  let component: DeleteProductConfirmDialogComponent;
  let fixture: ComponentFixture<DeleteProductConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProductConfirmDialogComponent ]
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
