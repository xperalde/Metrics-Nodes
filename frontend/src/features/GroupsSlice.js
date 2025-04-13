import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchGroups } from '../API/API'

export const getGroups = createAsyncThunk('groups/getGroups', async () => {
  const response = await fetchGroups();
  return response.data;
});

const groupsSlice = createSlice({
  name: 'groups',
  initialState: { list: [], status: 'idle' },
  extraReducers: builder => {
    builder
      .addCase(getGroups.pending, state => {
        state.status = 'loading';
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getGroups.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default groupsSlice.reducer;
