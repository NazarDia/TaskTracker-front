import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBoards,
  addBoard,
  deleteBoard,
  editBoardById,
  getBoardByID,
  fetchBackgrounds
} from './operations.js';

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: {
      current: {},
      items: [],
      backgrounds: [],
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    setFilter(state, action) {
      state.boards.current.board.filter = action.payload;
    },
    setActiveBoard(state, action) {
      state.boards.current = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBoards.pending, state => {
        state.boards.isLoading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = null;
        state.boards.items = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      })
      .addCase(getBoardByID.pending, state => {
        state.boards.isLoading = true;
      })
      .addCase(getBoardByID.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = null;
        state.boards.current = action.payload;
      })
      .addCase(getBoardByID.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      })
      .addCase(addBoard.pending, state => {
        state.boards.isLoading = true;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = null;
        state.boards.items.push(action.payload);
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      })
      .addCase(editBoardById.pending, (state) => {
        state.boards.isLoading = true;
      })
      .addCase(editBoardById.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        const updatedBoardIndex = state.boards.items.findIndex((board) => board._id === action.payload._id);
        if (updatedBoardIndex !== -1) {
          state.boards.items[updatedBoardIndex] = action.payload;
        }
        state.boards.current = action.payload; 
      })
      .addCase(editBoardById.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.error.message;
      })
      .addCase(deleteBoard.pending, state => {
        state.boards.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = null;
        const deletedId = action.payload.id || action.payload._id;
        state.boards.items = state.boards.items.filter(
          board => board._id !== deletedId
        );
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      })
      .addCase(fetchBackgrounds.pending, state => {
        state.boards.isLoading = true;
      })
      .addCase(fetchBackgrounds.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = null;
        state.boards.backgrounds = action.payload;
      })
      .addCase(fetchBackgrounds.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      });
  },
});

export const { setActiveBoard, setFilter } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
