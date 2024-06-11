import { createSlice } from '@reduxjs/toolkit';
import { addCard, deleteCard, fetchCards, updateCard } from './operations';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  extraReducers: builder =>
    builder
      .addCase(fetchCards.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchCards.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addCard.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateCard.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          card => card.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteCard.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          task => task._id !== action.payload.taskId
        );
      })
      .addCase(deleteCard.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export default cardsSlice.reducer;
