import {Product} from '../models/product';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';

export class LoadProductsAction {
  readonly type = LOAD_PRODUCTS;
  constructor() {}
}

export class LoadProductsSuccessAction {
  readonly type = LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class DeleteProductAction {
  readonly type = DELETE_PRODUCT;
  constructor(public payload: Product) {}
}

export class DeleteProductSuccessAction {
  readonly type = DELETE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export type Action
  = LoadProductsAction
  | LoadProductsSuccessAction
  | DeleteProductAction
  | DeleteProductSuccessAction
  ;
