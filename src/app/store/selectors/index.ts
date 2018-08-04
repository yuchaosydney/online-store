import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProducts from '../reducers/products.reducer';

export const getProductsState = createSelector(
  fromFeature.getFeatureProductsState,
  (state: fromFeature.ProductsFeatureState) => state.products
);

export const getProductsEntities = createSelector(
  getProductsState,
  fromProducts.getProductsEntities
);


export const getAllProducts = createSelector(getProductsEntities, entities => {
  return Object.keys(entities).map(_id => entities[_id]);
});

// export const getSelectedProduct = createSelector(
//   getProductEntities
// );
