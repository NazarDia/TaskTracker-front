import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//GET
export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cards');
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
      const response = await axios.post('/card', newCard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
