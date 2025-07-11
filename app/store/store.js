
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import userReducer from './features/userSlice';
import cartReducer from './features/cartSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
  },
});
