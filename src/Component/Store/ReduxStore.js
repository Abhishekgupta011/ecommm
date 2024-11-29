import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Slices/CartSlice";
import authReducer from "../Slices/AuthSlice";
import productReducer from "../Slices/ProductSlice";
const ReduxStore = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});
export default ReduxStore;
