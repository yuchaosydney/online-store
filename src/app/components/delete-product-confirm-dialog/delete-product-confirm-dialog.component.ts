import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Product} from '../../models/product';

import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state';
import {DeleteProductAction} from '../../actions/products.actions';

@Component({
  selector: 'app-delete-product-confirm-dialog',
  templateUrl: './delete-product-confirm-dialog.component.html',
  styleUrls: ['./delete-product-confirm-dialog.component.scss']
})
export class DeleteProductConfirmDialogComponent implements OnInit {

  deleteProduct: Product;

  constructor(
    public bsModalRef: BsModalRef,
    private productStore: Store<AppState>,
  ) { }

  ngOnInit() {}

  confirm(): void {
    this.productStore.dispatch(new DeleteProductAction(this.deleteProduct, this.bsModalRef));
  }

  decline(): void {
    this.bsModalRef.hide();
  }

}
