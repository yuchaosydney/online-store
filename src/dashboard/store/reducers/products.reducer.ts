import * as fromActions from './../actions';
import { Product } from '../../models/product';

export interface ProductsState {
  entities: { [id: number]: Product};
  loaded: boolean;
  loading: boolean;
  productSaving: boolean;
  productSaved: boolean;
}

export const initialState: ProductsState = {
  entities: {},
  loaded: false,
  loading: false,
  productSaving: false,
  productSaved: false,
};

export function reducer(state = initialState, action: fromActions.Action) {
  switch (action.type) {
    case fromActions.LOAD_PRODUCTS: {
      return {
        ...state,
        loading: true
      }
    }
    case fromActions.LOAD_PRODUCTS_SUCCESS: {
      const products = action.payload;

      const entities = products.length ? products.reduce(
        (entities: { [id: number]: Product}, product: Product) => {
          return {
            ...entities,
            [product._id]: product
          };
        },
        {
          ...state.entities
        }
      ) : {};

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromActions.DELETE_PRODUCT_SUCCESS: {
      const product = action.payload;
      const { [product._id]: removed, ...entities} = state.entities;

      action.bsModalRef.hide();
      return {
        ...state,
        entities
      };
    }
    case fromActions.CREATE_PRODUCT_SUCCESS:
    case fromActions.EDIT_PRODUCT_SUCCESS:
    {
      const product = action.payload;
      const entities = {
        ...state.entities,
        [product._id]: product
      };

      return {
        ...state,
        entities,
        productSaving: false,
        productSaved: true
      };
    }
    case fromActions.CREATE_PRODUCT:
    case fromActions.EDIT_PRODUCT:
    {
      return {
        ...state,
        productSaving: true
      }
    }
    default :  {
      return state;
    }
  }
}

export const getProductsEntities = (state: ProductsState) => state.entities;
export const getProductsLoading = (state: ProductsState) => state.loading;
export const getProductsLoaded = (state: ProductsState) => state.loaded;
export const getProductSaving = (state: ProductsState) => state.productSaving;
export const getProductSaved = (state: ProductsState) => state.productSaved;
