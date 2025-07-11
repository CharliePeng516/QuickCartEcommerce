import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async (token) => {
  const { data } = await axios.get('/api/user/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    isSeller: false,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
        if (action.payload?.publicMetadata.role === 'seller') {
          state.isSeller = true;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;