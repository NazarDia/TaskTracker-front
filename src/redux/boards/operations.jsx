import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (board, thunkAPI) => {
    try {
      const response = await axios.post("/boards", board);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editBoardById = createAsyncThunk(
  "boards/editBoardById",
  async (params, thunkAPI) => {
    try {
      const { boardId, updatedData } = params;
      const response = await axios.put(`/boards/${boardId}`, updatedData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (boardId, thunkAPI) => {
    try {
      const response = await axios.delete(`/boards/${boardId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);