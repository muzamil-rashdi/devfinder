import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  layout: 'grid' | 'list';
  itemsPerPage: number;
  sortBy: 'stars' | 'forks' | 'updated';
}

const initialState: UIState = {
  layout: 'grid',
  itemsPerPage: 10,
  sortBy: 'stars',
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.layout = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'stars' | 'forks' | 'updated'>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setLayout, setItemsPerPage, setSortBy } = uiSlice.actions;
export default uiSlice.reducer;