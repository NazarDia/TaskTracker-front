import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://tasktracker-back.onrender.com/api';

const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/register', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthHeader(token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthHeader(token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Invalid email or password');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logout');
    localStorage.removeItem('token');
    clearAuthHeader();
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    setAuthHeader(token);

    return { token };
  },
  {
    condition: (_, { getState }) => {
      const reduxState = getState();
      return reduxState.auth.token !== null;
    },
  }
);

export const changeTheme = createAsyncThunk(
  'auth/usertheme',
  async (userTheme, thunkAPI) => {
    try {
      const response = await axios.post('/users/theme', userTheme);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateprofile',
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.put('/users/update', formData);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const sendFeedback = createAsyncThunk(
  'feedback/sendFeedback',
  async ({ email, message }, thunkAPI) => { 
    try {
      const response = await axios.post('/users/feedback',{ email, message }); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
