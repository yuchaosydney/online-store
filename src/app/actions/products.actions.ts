import {Product} from '../models/product';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';

export class LoadProductsAction {
  readonly type = LOAD_PRODUCTS;
  constructor() {}
}

export class LoadProductsSuccessAction {
  readonly type = LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export type Action
  = LoadProductsAction
  | LoadProductsSuccessAction;
