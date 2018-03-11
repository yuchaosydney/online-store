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
}