import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
    user: userReducer,
  },
});
