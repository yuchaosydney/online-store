import {Component, OnInit, Input} from '@angular/core';
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
  isEditing: boolean;
  editingProduct: Product;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private productsService: ProductsService) {
    this.productForm = fb.group({
      'productName': ['', Validators.required],
      'productPrice': ['', Validators.required],
      'productDesc': ['', Validators.required]
    });
    this.isEditing = false;
  }

  ngOnInit() {
    console.log('---------------', this.editingProduct);
    if (this.productForm ) {
      this.productForm.setValue({
        'productName': this.editingProduct.name,
        'productPrice': this.editingProduct.price,
        'productDesc': this.editingProduct.description});
    }
  }

  saveProduct() {
    const formModel = this.productForm.value;
    if (this.isEditing) {
      // this.productsService.editProduct()
    } else {
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
}
