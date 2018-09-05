import * as productActions from './../actions/products.actions';
import { Product } from '../../models/product';

export interface ProductsState {
  entities: { [id: number]: Product};
  loaded: boolean;
  loading: boolean;
}

export const initialState: ProductsState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: productActions.Action) {
  switch (action.type) {
    case productActions.LOAD_PRODUCTS_SUCCESS: {
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
    case productActions.DELETE_PRODUCT_SUCCESS: {
      const product = action.payload;
      const { [product._id]: removed, ...entities} = state.entities;

      action.bsModalRef.hide();
      return {
        ...state,
        entities
      };
    }
    case productActions.CREATE_PRODUCT_SUCCESS:
    case productActions.EDIT_PRODUCT_SUCCESS:
    {
      const product = action.payload;
      const entities = {
        ...state.entities,
        [product._id]: product
      };

      return {
        ...state,
        entities
      };
    }
    case productActions.UPLOAD_IMAGE_FILES: {
      return state;
    }
    default :  {
      return state;
    }
  }
}

export const getProductsEntities = (state: ProductsState) => state.entities;
export const getProductsLoading = (state: ProductsState) => state.loading;
export const getProductsLoaded = (state: ProductsState) => state.loaded;
