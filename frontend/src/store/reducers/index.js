import { combineReducers } from 'redux';
import wishlistReducer from './wishlistReducer';
import cartReducer from './cartReducer';
// import other reducers


const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  cart: cartReducer
  // other reducers
});

export default rootReducer;
