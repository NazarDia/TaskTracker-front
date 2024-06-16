import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    priority: 'all',
  },
  reducers: {
    setPriorityFilter(state, action) {
      // console.log(state.priority);
      state.priority = action.payload;
      // console.log(state.priority);
    },
  },
});

export const { setPriorityFilter } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
