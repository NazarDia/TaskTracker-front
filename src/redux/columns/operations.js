import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editColumnById = createAsyncThunk(
  'columns/editColumnById',
  async (updColumn, thunkAPI) => {
    try {
      const response = await axios.put('/columns', updColumn);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (columnId, thunkAPI) => {
    try {
      const response = await axios.delete(`/columns/${columnId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
