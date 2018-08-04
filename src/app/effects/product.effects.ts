import { Injectable } from '@angular/core';
import { ProductsService } from '../services/product/products.service';
import { FileService } from '../services/file/file.service';
import { Effect, Actions } from '@ngrx/effects';
import * as productActions from '../actions/products.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Product } from '../models/product';

@Injectable()
export class ProductEffects {

  constructor(
    private productService: ProductsService,
    private fileService: FileService,
    private actions$: Actions
  ) {}

  @Effect() loadProducts$ = this.actions$
    .ofType(productActions.LOAD_PRODUCTS)
    .switchMap(() => this.productService.getAllProducts().map(products => (new productActions.LoadProductsSuccessAction(products))));

  @Effect() deleteProduct$ = this.actions$
    .ofType(productActions.DELETE_PRODUCT)
    .switchMap((action: productActions.DeleteProductAction) => this.productService.deleteProduct(action.payload)
      .map(res => (new productActions.DeleteProductSuccessAction(action.payload, action.bsModalRef))));

  @Effect() createProduct$ = this.actions$
    .ofType(productActions.CREATE_PRODUCT)
    .switchMap((action: productActions.CreateProductAction) => this.productService.createProduct(action.payload)
      .map(res => (new productActions.CreateProductSuccessAction(res, action.bsModalRef))));

  @Effect() editProduct$ = this.actions$
    .ofType(productActions.EDIT_PRODUCT)
    .switchMap((action: productActions.EditProductAction) => {
      return this.productService.editProduct(action.payload)
      .map(res => {
        return new productActions.EditProductSuccessAction(res, action.bsModalRef);
      });
    });

  @Effect() uploadImages$ = this.actions$
    .ofType(productActions.UPLOAD_IMAGE_FILES)
    .switchMap((action: productActions.UploadImagesAction) => this.fileService.uploadFiles(action.filesPayload)
      .map(res => {
        console.log('--------------effects-----------', res);
        action.productPayload.images = res;
        const product = Object.assign(new Product('', '', 0,  []), action.productPayload);
        return new productActions.EditProductAction(product, action.bsModalRef);
      }));
}
