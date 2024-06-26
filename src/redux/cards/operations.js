import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getBoardByID } from '../boards/operations';

axios.defaults.baseURL = 'https://tasktracker-back.onrender.com/api';

//GET
export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/tasks');

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
//UPDATE
// export const updateCard = createAsyncThunk(
//   'card/updateCard',
//   async (updatedCard, thunkAPI) => {
//     try {
//       const response = await axios.put(`/tasks/${updatedCard.id}`, updatedCard);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );,

export const updateCard = createAsyncThunk(
  'card/updateCard',
  async (
    { id, boardId, label, columnId, deadline, description, title },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(`/tasks/${id}`, {
        boardId,
        label,
        columnId,
        deadline,
        description,
        title,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'tasks/deleteCard',
  async ({ taskId, columnId, boardId }, thunkAPI) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`, {
        data: { columnId },
      });
      thunkAPI.dispatch(getBoardByID(boardId));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// MOVE

export const moveCard = createAsyncThunk(
  'cards/moveCard',
  async ({ taskId, boardId, targetColumnName }, thunkAPI) => {
    try {
      const response = await axios.patch(`/tasks/${taskId}`, {
        boardId,
        title: targetColumnName,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
