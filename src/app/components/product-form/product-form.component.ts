import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/product/products.service';
import {Product} from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  products: Product[];

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private productsService: ProductsService) {
    this.productForm = fb.group({
      'productName': [null, Validators.required],
      'productPrice': ['', Validators.required],
      'productDesc': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  saveProduct() {
    const formModel = this.productForm.value;
    const product = new Product(formModel.productName, formModel.productDesc, formModel.productPrice,  []);
    this.productsService.createProduct(product).subscribe(
      result => {
        this.products.unshift(result.instance);
        this.bsModalRef.hide();
      },
      error => console.log(error)
    );
  }
}
