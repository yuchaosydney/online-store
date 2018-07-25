import {hot, cold} from 'jasmine-marbles';
import {ProductEffects} from './product.effects';
import { Actions } from '@ngrx/effects';
import * as fromActions from '../actions/products.actions';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {toArray} from 'rxjs/operator/toArray';
import {toPromise} from 'rxjs/operator/toPromise';

import { Product } from '../models/product';

describe('product effects', () => {

  const mockFile = new File([JSON.stringify({hello: 'world'}, null, 2)], 'test-file.jpg', { type: 'image/jpeg'});

  const mockProductList = [
    {
      _id: '5b3785a976477f000ea0e3b1',
      name: 'Hello',
      sku: 'VuA5W',
      description: 'fdfd',
      price: 232,
      __v: 0,
      images: []
    }
  ];

  const mockProduct: Product = new Product(
    'Hello',
    'description',
    232,
    [],
    '5b3785a976477f000ea0e3b1',
    'VuA5W',
  );

  describe('loadProducts$', () => {
    it('should dispatch load success action', () => {

      const actions = new Actions(hot('-a-|', {a: new fromActions.LoadProductsAction()}));
      const service = stubService(mockProductList);
      const effects = new ProductEffects(service , null , actions);

      expect(effects.loadProducts$).toBeObservable(cold('-a-|', {a: new fromActions.LoadProductsSuccessAction(mockProductList)}));
    });

    it('should dispatch load success action with await', async () => {

      const actions = new Actions(hot('-a-|', {a: new fromActions.LoadProductsAction()}));
      const service = stubService(mockProductList);
      const effects = new ProductEffects(service , null , actions);

      expect(await readAll(effects.loadProducts$)).toEqual([
        new fromActions.LoadProductsSuccessAction(mockProductList)
      ]);

    });
  });

  describe('deleteProduct$', () => {
    it('should dispatch DeleteProductSuccessAction action', () => {

      const actions = new Actions(hot('-a-|', {a: new fromActions.DeleteProductAction(mockProduct, null)}));
      const service = stubService(mockProduct);
      const effects = new ProductEffects(service , null , actions);

      expect(effects.deleteProduct$).toBeObservable(cold('-a-|', {a: new fromActions.DeleteProductSuccessAction(mockProduct, null)}));
    });
  });

  describe('createProduct$', () => {
    it('should dispatch CreateProductSuccessAction action', () => {

      const actions = new Actions(hot('-a-|', {a: new fromActions.CreateProductAction(mockProduct, null)}));
      const service = stubService(mockProduct);
      const effects = new ProductEffects(service , null , actions);

      expect(effects.createProduct$).toBeObservable(cold('-a-|', {a: new fromActions.CreateProductSuccessAction(mockProduct, null)}));
    });
  });

  describe('uploadImages$', () => {
    it('should dispatch EditProductAction action', () => {
      const actions = new Actions(hot('-a-|', {a: new fromActions.UploadImagesAction([mockFile], mockProduct, null)}));
      const fileService = stubFileService([{filename: mockFile.name}]);
      const effects = new ProductEffects(null , fileService , actions);

      expect(effects.uploadImages$).toBeObservable(cold('-a-|', {a: new fromActions.EditProductAction(mockProduct, null)}));
    });
  });

  function stubService(response: any): any {
    const service = jasmine.createSpyObj('service', ['getAllProducts', 'deleteProduct', 'createProduct', 'fileService']);
    service.getAllProducts.and.returnValue(of(response));
    service.deleteProduct.and.returnValue(of(response));
    service.createProduct.and.returnValue(of(response));
    service.fileService.and.returnValue(of(response));
    return service;
  }

  function stubFileService(response: any): any {
    const service = jasmine.createSpyObj('service', ['uploadFiles']);
    service.uploadFiles.and.returnValue(of(response));
    return service;
  }
});



// extract into utils file
export function readAll<T>(o: Observable<T>): Promise<T[]> {
  return toPromise.call(toArray.call(o));
}
