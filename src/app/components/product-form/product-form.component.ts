import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) { 
    this.productForm = fb.group({
      'name': [null, Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

}
