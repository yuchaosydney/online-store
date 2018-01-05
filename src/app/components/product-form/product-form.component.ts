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
    console.log('saving product......', formModel);

    const product = new Product(formModel.productName, formModel.productDesc, formModel.productPrice,  []);

    this.productsService.createProduct(product).subscribe(
      result => {
        console.log('---result-------', result);
      },
      error => console.log(error)
    );;
  }

}
