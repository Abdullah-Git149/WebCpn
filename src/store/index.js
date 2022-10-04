import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/userSlice';
import couponsReducer from './slices/couponSlice';

const Store = configureStore({
    reducer: {
      users: usersReducer,
      coupons:couponsReducer
     } 
  })
export default Store  