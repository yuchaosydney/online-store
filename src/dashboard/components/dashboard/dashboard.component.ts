import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { TOKEN_NAME } from '../../services/index';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProductFormComponent } from '../product-form/product-form.component';
/* tslint:disable:max-line-length */
import { DeleteProductConfirmDialogComponent } from '../delete-product-confirm-dialog/delete-product-confirm-dialog.component';
import { Store } from '@ngrx/store';
import { AppState} from '../../models/app-state';
import { Observable } from 'rxjs/Observable';

import * as fromStore from '../../store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products$: Observable<Product[]>;
  products: Product[];
  modalRef: BsModalRef;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private modalService: BsModalService
  ) {
  }

  logout(): void {
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['/login']);
  }

  openProductFormModal() {
    this.modalRef = this.modalService.show(ProductFormComponent);
    this.modalRef.content.products = this.products;
  }

  editProductFormModal(product: Product) {
    const initialState = {
      editingProduct: product,
      isEditing: true
    };
    this.modalRef = this.modalService.show(ProductFormComponent, {initialState});
  }

  openDeleteProductModal(product: Product) {
    const initialState = {
      deleteProduct: product
    };
    this.modalRef = this.modalService.show(DeleteProductConfirmDialogComponent, {initialState});
    this.modalRef.content.products = this.products;
  }

  ngOnInit(): void {
    this.products$ = this.store.select(fromStore.getAllProducts);
  }

}
