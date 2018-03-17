import {Component, OnInit, Input} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/product/products.service';
import {Product} from '../../models/product';

import { Store } from '@ngrx/store';
import { AppState} from '../../models/app-state';
import * as productActions from '../../actions/products.actions';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  products: Product[];
  isEditing: boolean;
  editingProduct: Product;

  constructor(
    private productStore: Store<AppState>,
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {
    this.productForm = fb.group({
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
  }

  saveProduct() {
    if (this.isEditing) {

      this.productsService.editProduct(this.editingProduct).subscribe(
        result => {
          this.bsModalRef.hide();
        },
        error => console.log(error)
      );
    } else {
      const product = new Product(this.editingProduct.name, this.editingProduct.description, this.editingProduct.price,  []);
      this.productStore.dispatch(new productActions.CreateProductAction(product));
      this.bsModalRef.hide();
      // this.productsService.createProduct(product).subscribe(
      //   result => {
      //     this.products.unshift(result.instance);
      //     this.bsModalRef.hide();
      //   },
      //   error => console.log(error)
      // );
    }

  }
}
