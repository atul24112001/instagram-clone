import { createSlice } from "@reduxjs/toolkit";

type User = {
  name: string;
  email: string;
  id: string;
};

export type InitialAuthState = {
  user: User | null;
  isAuthenticated: boolean;
  token: null | string;
};

const initialState: InitialAuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "Authentcation",
  initialState,
  reducers: {
    authenticate: (
      state: InitialAuthState,
      { payload }: { payload: { user: User; token: string } }
    ) => {
      console.log("Authentcation Actions");
      state = {
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
      };
      return state;
    },
    logout: (state: InitialAuthState) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = {
        user: null,
        token: null,
        isAuthenticated: false,
      };
      return state;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;
