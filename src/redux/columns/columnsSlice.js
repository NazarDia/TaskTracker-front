import { createSlice } from '@reduxjs/toolkit';
import {
  getAllColumns,
  addNewColumn,
  editColumnById,
  deleteColumn,
} from './operations.js';

const columnsSlice = createSlice({
  name: 'columns',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(getAllColumns.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getAllColumns.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllColumns.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addNewColumn.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addNewColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addNewColumn.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editColumnById.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(editColumnById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedColumnIndex = state.items.findIndex(
          column => column.id === action.payload.id
        );
        if (updatedColumnIndex !== -1) {
          state.items[updatedColumnIndex] = action.payload;
        }
      })
      .addCase(editColumnById.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteColumn.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          column => column.id !== action.payload.id
        );
      })
      .addCase(deleteColumn.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default columnsSlice.reducer;
