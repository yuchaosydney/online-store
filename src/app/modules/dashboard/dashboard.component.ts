import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { StoreSummary } from './store-summary';
import { Product } from '../../models/product';
import { TOKEN_NAME } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/product/products.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import {DeleteProductConfirmDialogComponent} from "../../components/delete-product-confirm-dialog/delete-product-confirm-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: Product[];
  modalRef: BsModalRef;

  constructor(private storeService: StoreService,
    private router: Router,
    private productsService: ProductsService,
    private modalService: BsModalService) {}

  getAllProducts () {
    this.productsService.getAllProducts().subscribe(
      result => {
        if (result.success) {
          this.products = result.products;
        }
      },
      error => console.log(error)
    );
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
