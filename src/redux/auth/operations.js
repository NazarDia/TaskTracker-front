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
      if (e.response && e.response.status === 409) {
        return thunkAPI.rejectWithValue('This email already used');
      }
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
    const response = await axios.get('/users/current');
    return response.data;
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
      const response = await axios.patch('/users/theme', userTheme);
      const { theme } = response.data;
      localStorage.setItem('theme', theme);
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
      const response = await axios.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendFeedback = createAsyncThunk(
  'feedback/sendFeedback',
  async ({ email, message }, thunkAPI) => {
    try {
      const response = await axios.post('/users/feedback', { email, message });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
