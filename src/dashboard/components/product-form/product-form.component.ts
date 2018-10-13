import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as fromModels from '../../models';

import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state';
import * as productActions from '../../store/actions/products.actions';

import * as fromStore from '../../store';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  isEditing: boolean;
  editingProduct: fromModels.Product;
  files: string[];
  progressObj: fromModels.ProgressValueType;

  constructor(
    private productsStore: Store<AppState>,
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
  ) {
    this.productForm = this.fb.group({
      'name': ['', Validators.required],
      'price': ['', Validators.required],
      'description': ['', Validators.required]
    });
    this.isEditing = false;
    this.progressObj = {
      type: '',
      value: 0
    };
  }

  ngOnInit() {
    if (this.productForm && this.isEditing ) {
      this.productForm.setValue({
        'name': this.editingProduct.name,
        'price': this.editingProduct.price,
        'description': this.editingProduct.description
      });
    }
    if (!this.editingProduct)
      this.editingProduct = new fromModels.Product('', '', 0,  []);

    this.files = this.editingProduct.images;

   this.productsStore.select(fromStore.getProductSaving).subscribe(isProductSaving => {
      if (isProductSaving) {
        this.progressObj.value = 70;
        this.progressObj.type = 'saving to the product';
      }
   });

    this.productsStore.select(fromStore.getProductSaved).subscribe(isProductSaved => {
      if (isProductSaved) {
        this.progressObj.value = 100;
        this.progressObj.type = 'success';
      }
    });
  }

  saveProduct() {
    this.editingProduct = {
      ...this.editingProduct,
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      description: this.productForm.value.description
    };
    if (this.isEditing) {
      this.productsStore.dispatch(new productActions.EditProductAction(this.editingProduct));
    } else {
      const product = new fromModels.Product(this.editingProduct.name, this.editingProduct.description, this.editingProduct.price,  []);
      this.productsStore.dispatch(new productActions.CreateProductAction(product, this.bsModalRef));
    }
  }

  uploadFiles($event: any) {
    this.progressObj.value = 30;   
    this.progressObj.type = 'uploading image'; 
  }

  uploadFilesSuccess($event: string[]) {
    this.editingProduct = {
      ...this.editingProduct,
      images: [...this.editingProduct.images, ...$event]
    };
    this.productsStore.dispatch(new productActions.EditProductAction(this.editingProduct));
  }

}
