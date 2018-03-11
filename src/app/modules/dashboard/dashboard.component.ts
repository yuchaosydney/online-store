import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { TOKEN_NAME } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { DeleteProductConfirmDialogComponent } from '../../components/delete-product-confirm-dialog/delete-product-confirm-dialog.component';
import { Store } from '@ngrx/store';
import { AppState} from '../../models/app-state';
import { Observable } from 'rxjs/Observable';
import * as productActions from '../../actions/products.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products$: Observable<any>;
  products: Product[];
  modalRef: BsModalRef;

  constructor(
    private productStore: Store<AppState>,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.products$ = this.productStore.select('products');
    this.products$.subscribe(state => {
      this.products = state.products;
    });
  }

  getAllProducts () {
    this.productStore.dispatch(new productActions.LoadProductsAction());
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
    this.getAllProducts();
  }

}
