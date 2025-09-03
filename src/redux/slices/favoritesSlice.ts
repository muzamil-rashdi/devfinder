import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GitHubUser } from "../../types/index";

interface FavoritesState {
  users: GitHubUser[];
}

const initialState: FavoritesState = {
  users: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<GitHubUser>) => {
      const userExists = state.users.some(user => user.id === action.payload.id);
      if (!userExists) {
        state.users.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    clearFavorites: state => {
      state.users = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;