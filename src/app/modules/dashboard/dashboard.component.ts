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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  newCustomersCount: StoreSummary;
  activeUsersCount: StoreSummary;
  salesSum; StoreSummary;
  products: Product[];

  modalRef: BsModalRef;

  constructor(private storeService: StoreService,
    private router: Router,
    private productsService: ProductsService,
    private modalService: BsModalService) {}

  getNewCustomersCount(): void {
    this.storeService.getNewCustomersCount().then(
      newCustomersCount => this.newCustomersCount = newCustomersCount
    );
  }

  getActiveUsersCount(): void {
    this.storeService.getActiveUsersCount().then( activeUsersCount =>
      this.activeUsersCount = activeUsersCount
    );
  }

  getSalesSum(): void {
    this.storeService.getSalesSum().then( salesSum =>
      this.salesSum = salesSum
    );
  }

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
    this.modalService.show(ProductFormComponent);
  }

  ngOnInit(): void {
    this.getNewCustomersCount();
    this.getActiveUsersCount();
    this.getSalesSum();
    this.getAllProducts();
  }

}
