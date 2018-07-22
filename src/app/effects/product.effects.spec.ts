import {hot} from 'jasmine-marbles';
import {ProductEffects} from './product.effects';
import { Actions } from '@ngrx/effects';
import * as fromActions from '../actions/products.actions';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {toArray} from 'rxjs/operator/toArray';
import {toPromise} from 'rxjs/operator/toPromise';

describe('product effects', () => {

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

  it('should dispatch load success action', () => {

    const actions = new Actions(hot('-a-|', {a: {type: fromActions.LOAD_PRODUCTS}}));
    const service = stubService(mockProductList);
    const effects = new ProductEffects(service , null , actions);

    expect(effects.loadProducts$).toBeObservable(hot('-a-|', {a: new fromActions.LoadProductsSuccessAction(mockProductList)}));
  });

  it('should dispatch load success action with await', async () => {

    const actions = new Actions(hot('-a-|', {a: {type: fromActions.LOAD_PRODUCTS}}));
    const service = stubService(mockProductList);
    const effects = new ProductEffects(service , null , actions);

    expect(await readAll(effects.loadProducts$)).toEqual([
      new fromActions.LoadProductsSuccessAction(mockProductList)
    ]);

  });

  function stubService(response: any): any {
    const service = jasmine.createSpyObj('service', ['getAllProducts']);
    service.getAllProducts.and.returnValue(of(response));
    return service;
  }
});



// extract into utils file
export function readAll<T>(o: Observable<T>): Promise<T[]> {
  return toPromise.call(toArray.call(o));
}
