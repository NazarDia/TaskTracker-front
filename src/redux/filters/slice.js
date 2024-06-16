import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    priority: "all",
  },
  reducers: {
    setPriorityFilter(state, action) {
      state.priority = action.payload;
    },
  },
});

export const { setPriorityFilter } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
