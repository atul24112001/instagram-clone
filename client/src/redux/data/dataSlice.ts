import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialDataState = {
  posts: [],
  suggestedUsers: [],
};

const dataSlice = createSlice({
  name: "data_slice",
  initialState,
  reducers: {
    addPosts: (state, action) => {
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    },
    addSuggestedUsers: (state, action) => {
      return {
        ...state,
        suggestedUsers: [...state.suggestedUsers, ...action.payload],
      };
    },
  },
});

export const dataReducer = dataSlice.reducer;
export const { addPosts, addSuggestedUsers } = dataSlice.actions;
