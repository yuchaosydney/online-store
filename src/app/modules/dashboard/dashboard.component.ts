import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { StoreSummary } from './store-summary';
import { Product } from '../../models/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  newCustomersCount: StoreSummary;
  activeUsersCount: StoreSummary;
  salesSum; StoreSummary;
  topSellingProducts: Product[];

  constructor(private storeService: StoreService) {}

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

  getTopSellingProducts(): void {
    this.storeService.getTopSellingProducts().then( topSellingProducts =>
      this.topSellingProducts = topSellingProducts
    );
  }

  ngOnInit(): void {
    this.getNewCustomersCount();
    this.getActiveUsersCount();
    this.getSalesSum();
    this.getTopSellingProducts();
  }

}
