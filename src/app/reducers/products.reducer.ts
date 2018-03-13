import * as productActions from './../actions/products.actions';

export function productReducer(state = [], action: productActions.Action) {
  switch (action.type) {
    case productActions.LOAD_PRODUCTS_SUCCESS: {
      return action.payload;
    }
    case productActions.DELETE_PRODUCT_SUCCESS: {
      return state.filter(product => product._id !== action.payload._id);
    }
    default :  {
      return state;
    }
  }
}
