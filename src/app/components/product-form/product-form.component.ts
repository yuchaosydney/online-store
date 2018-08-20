import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';

import { Store } from '@ngrx/store';
import { AppState} from '../../models/app-state';
import * as productActions from '../../store/actions/products.actions';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  isEditing: boolean;
  editingProduct: Product;
  files: string[];

  constructor(
    private appStore: Store<AppState>,
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
  ) {
    this.productForm = this.fb.group({
      'productName': ['', Validators.required],
      'productPrice': ['', Validators.required],
      'productDesc': ['', Validators.required]
    });
    this.isEditing = false;
  }

  ngOnInit() {
    if (this.productForm && this.isEditing ) {
      this.productForm.setValue({
        'productName': this.editingProduct.name,
        'productPrice': this.editingProduct.price,
        'productDesc': this.editingProduct.description});
    }
    if (!this.editingProduct)
      this.editingProduct = new Product('', '', 0,  []);

    this.files = this.editingProduct.images;
  }

  saveProduct() {
    if (this.isEditing) {
      this.appStore.dispatch(new productActions.EditProductAction(this.editingProduct, this.bsModalRef));
    } else {
      const product = new Product(this.editingProduct.name, this.editingProduct.description, this.editingProduct.price,  []);
      this.appStore.dispatch(new productActions.CreateProductAction(product, this.bsModalRef));
    }
  }

}
