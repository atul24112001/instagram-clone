import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialAuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    authenticate: (
      state: InitialAuthState,
      { payload }: { payload: { user: User; token: string } }
    ) => {
      console.log("Authentication Actions");
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
