import {Product} from '../models/product';
import {BsModalRef} from 'ngx-bootstrap';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';

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
  constructor(public payload: Product, public bsModalRef: BsModalRef) {}
}

export class DeleteProductSuccessAction {
  readonly type = DELETE_PRODUCT_SUCCESS;
  constructor(public payload: Product, public bsModalRef: BsModalRef) {}
}

export class CreateProductAction {
  readonly type = CREATE_PRODUCT;
  constructor(public payload: Product, public bsModalRef: BsModalRef) {}
}

export class CreateProductSuccessAction {
  readonly type = CREATE_PRODUCT_SUCCESS;
  constructor(public payload: Product, public bsModalRef: BsModalRef) {}
}

export class EditProductAction {
  readonly type = EDIT_PRODUCT;
  constructor(public payload: Product, public bsModalRef: BsModalRef) {}
}

export class EditProductSuccessAction {
  readonly type = EDIT_PRODUCT_SUCCESS;
  constructor(public payload: Product, public bsModalRef: BsModalRef) {}
}

export type Action
  = LoadProductsAction
  | LoadProductsSuccessAction
  | DeleteProductAction
  | DeleteProductSuccessAction
  | CreateProductAction
  | CreateProductSuccessAction
  | EditProductAction
  | EditProductSuccessAction
  ;
