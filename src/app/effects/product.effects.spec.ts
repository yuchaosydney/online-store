import {hot} from 'jasmine-marbles';
import {ProductEffects} from './product.effects';
import { Actions } from '@ngrx/effects';
import * as fromActions from '../actions/products.actions';
import {of} from 'rxjs/observable/of';

describe('product effects', () => {

  it('should work with effects that only use observables', () => {
    const productList = [
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

    const actions = new Actions(hot('-a-|', {a: {type: fromActions.LOAD_PRODUCTS}}));
    const service = stubService(productList);
    const effects = new ProductEffects(service , null , actions);

    expect(effects.loadProducts$).toBeObservable(hot('-a-|', {a: new fromActions.LoadProductsSuccessAction(productList)}));

  });

  function stubService(response: any): any {
    const service = jasmine.createSpyObj('service', ['getAllProducts']);
    service.getAllProducts.and.returnValue(of(response));
    return service;
  }
});
