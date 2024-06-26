import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getBoardByID } from '../boards/operations';

axios.defaults.baseURL = 'https://tasktracker-back.onrender.com/api';

export const getAllColumns = createAsyncThunk(
  'columns/getAllColumns',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/columns');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addNewColumn = createAsyncThunk(
  'columns/addNewColumn',
  async (newColumn, thunkAPI) => {
    try {
      const response = await axios.post('/columns', newColumn);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const editColumnById = createAsyncThunk(
  'columns/editColumnById',
  async ({ columnId, boardId, columnTitle }, thunkAPI) => {
    try {
      const response = await axios.put(`/columns/${columnId}`, {
        boardId,
        title: columnTitle,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async ({ columnId, boardId }, thunkAPI) => {
    try {
      const response = await axios.delete(`/columns/${columnId}`, {
        data: { boardId },
      });
      thunkAPI.dispatch(getBoardByID(boardId));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
