import { createSlice } from "@reduxjs/toolkit";
import {
  addBoard,
  deleteBoard,
  editBoardById,
} from "./operations";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: {
      current: {},
      items: [],
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    setFilter(state, action) {
      state.boards.current.board.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBoard.pending, (state) => {
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
        state.boards.error = null;

        state.boards.items = state.boards.items.map((board) =>
          board._id === action.payload._id
            ? { ...board, ...action.payload }
            : board
        );
      })
      .addCase(editBoardById.rejected, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = action.payload;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.boards.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards.isLoading = false;
        state.boards.error = null;

        const deletedId = action.payload.id || action.payload._id;

        state.boards.items = state.boards.items.filter(
          (board) => board._id !== deletedId
        );
      })
  },
});

export const boardsReducer = boardsSlice.reducer;
