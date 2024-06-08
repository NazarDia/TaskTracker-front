import { createSlice } from '@reduxjs/toolkit';
import { addCard, fetchCards } from './operations';

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
      }),
});

export default cardsSlice.reducer;
