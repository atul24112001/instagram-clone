import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice, { InitialAuthState } from "./auth/authSlice";

export type RootStateType = {
  authReducer: InitialAuthState;
};

const store = configureStore({
  reducer: combineReducers({
    authReducer: authSlice,
  }),
});

export default store;
