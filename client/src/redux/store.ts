import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { dataReducer } from "./data/dataSlice";

export type RootStateType = {
  authReducer: InitialAuthState;
  dataReducer: InitialDataState;
};

const store = configureStore({
  reducer: combineReducers({
    authReducer: authReducer,
    dataReducer: dataReducer,
  }),
});

export default store;
