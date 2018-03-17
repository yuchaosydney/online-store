import { Injectable } from '@angular/core';
import { ProductsService } from '../services/product/products.service';
import { Effect, Actions } from '@ngrx/effects';
import * as productActions from '../actions/products.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductEffects {

  constructor(
    private productService: ProductsService,
    private actions$: Actions
  ) {}

  @Effect() loadProducts$ = this.actions$
    .ofType(productActions.LOAD_PRODUCTS)
    .switchMap(() => this.productService.getAllProducts().map(products => (new productActions.LoadProductsSuccessAction(products))));

  @Effect() deleteProduct$ = this.actions$
    .ofType(productActions.DELETE_PRODUCT)
    .switchMap((action: productActions.DeleteProductAction) => this.productService.deleteProduct(action.payload)
      .map(res => (new productActions.DeleteProductSuccessAction(action.payload))));

  @Effect() createProduct$ = this.actions$
    .ofType(productActions.CREATE_PRODUCT)
    .switchMap((action: productActions.CreateProductAction) => this.productService.createProduct(action.payload)
      .map(res => (new productActions.CreateProductSuccessAction(res))));
}
