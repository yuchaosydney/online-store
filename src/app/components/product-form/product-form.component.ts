import {Component, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Product} from '../../models/product';

import { Store } from '@ngrx/store';
import { AppState} from '../../models/app-state';
import * as productActions from '../../actions/products.actions';

import { csLocale } from 'ngx-bootstrap/chronos/i18n/cs';

import { AuthService } from '../../services/auth/auth.service';
import { FileDropZoneComponent } from '../file-drop-zone/file-drop-zone.component';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  isEditing: boolean;
  editingProduct: Product;

  constructor(
    private productStore: Store<AppState>,
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.productForm = fb.group({
      'productName': ['', Validators.required],
      'productPrice': ['', Validators.required],
      'productDesc': ['', Validators.required]
    });
    this.isEditing = false;

    // this.afuConfig = {
    //   url: `http://localhost:3000/api/file/upload`,
    //   headers: [{ name: 'x-access-token', value : this.authService.getToken() } ]
    // };

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
  }

  saveProduct() {
    if (this.isEditing) {
      this.productStore.dispatch(new productActions.EditProductAction(this.editingProduct, this.bsModalRef));
    } else {
      const product = new Product(this.editingProduct.name, this.editingProduct.description, this.editingProduct.price,  []);
      this.productStore.dispatch(new productActions.CreateProductAction(product, this.bsModalRef));
    }
  }
}
