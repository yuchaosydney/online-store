import * as productActions from './../actions/products.actions';

export function companyReducer(state = [], action: productActions.Action) {
  switch (action.type) {
    case productActions.LOAD_PRODUCTS_SUCCESS: {
      return action.payload;
    }
    default :  {
      return state;
    }
  }
}
