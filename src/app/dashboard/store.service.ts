import { Injectable } from '@angular/core';
import { StoreSummary } from './store-summary';
import { NEW_CUSTOMER_COUNT, ACTIVE_USERS_COUNT, SALES_SUM } from './mock-store-summary';
import { PRODUCTS } from './mock-product';
import { Product } from '../product';

@Injectable()
export class StoreService {
  constructor() { }
  getNewCustomersCount(): Promise<StoreSummary> {
    return Promise.resolve(NEW_CUSTOMER_COUNT);
  }
  getActiveUsersCount(): Promise<StoreSummary> {
    return Promise.resolve(ACTIVE_USERS_COUNT);
  }
  getSalesSum(): Promise<StoreSummary> {
    return Promise.resolve(SALES_SUM);
  }
  getTopSellingProducts(): Promise<Product[]> {
    return Promise.resolve(PRODUCTS);
  }
}
