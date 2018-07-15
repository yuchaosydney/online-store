import * as productActions from './../actions/products.actions';

export function productReducer(state = [], action: productActions.Action) {
  switch (action.type) {
    case productActions.LOAD_PRODUCTS_SUCCESS: {
      return action.payload;
    }
    case productActions.DELETE_PRODUCT_SUCCESS: {
      action.bsModalRef.hide();
      return state.filter(product => product._id !== action.payload._id);
    }
    case productActions.CREATE_PRODUCT_SUCCESS: {
      state.unshift(action.payload);
      action.bsModalRef.hide();
      return state;
    }
    case productActions.EDIT_PRODUCT_SUCCESS: {
      console.log('---------reducer--------11----', action.payload);
      console.log('---------reducer--------11----', state);
      action.bsModalRef.hide();
      return state;
    }
    case productActions.UPLOAD_IMAGE_FILES: {
      return state;
    }
    default :  {
      return state;
    }
  }
}
