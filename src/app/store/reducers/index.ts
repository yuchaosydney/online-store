import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProducts from './products.reducer';

export interface ProductsFeatureState {
  products: fromProducts.ProductsState;
}

export const reducers: ActionReducerMap<ProductsFeatureState> = {
  products: fromProducts.reducer
};

export const getFeatureProductsState = createFeatureSelector<ProductsFeatureState>('products');
