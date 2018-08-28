import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';
import { HttpCallsService } from '../http-calls/http-calls.service';

@Injectable()
export class ProductsService {

  constructor(private httpCallsService: HttpCallsService) { }

  getAllProducts(): Observable<any> {
    return this.httpCallsService.getRequest('product/all');
  }

  createProduct(product: Product): Observable<any> {
    return this.httpCallsService.postRequest('product/create', product);
  }

  editProduct(product: Product): Observable<any> {
    return this.httpCallsService.putRequest(`product/${product._id}/edit`, product);
  }

  deleteProduct(product: Product): Observable<any> {
    return this.httpCallsService.deleteRequest(`product/${product._id}/delete`);
  }
}
