import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMetrics } from '../API/API';

export const getMetrics = createAsyncThunk('metrics/getMetrics', async () => {
  const response = await fetchMetrics();
  return response.data;
});

const metricsSlice = createSlice({
  name: 'metrics',
  initialState: { data: [], status: 'idle' },
  extraReducers: builder => {
    builder
      .addCase(getMetrics.pending, state => {
        state.status = 'loading';
      })
      .addCase(getMetrics.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getMetrics.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default metricsSlice.reducer;
