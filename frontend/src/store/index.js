import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import wishlistReducer from './reducers/wishlistReducer';
import cartReducer from './reducers/cartReducers';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  wishlist: wishlistReducer,
  cart: cartReducer, 
});


const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
