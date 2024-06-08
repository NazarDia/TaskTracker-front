import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://tasktracker-back.onrender.com/api';

//GET
export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/tasks');
      console.log('response.data', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//ADD
export const addCard = createAsyncThunk(
  'card/addCard',
  async (newCard, thunkAPI) => {
    try {
      const response = await axios.post('/tasks', newCard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
