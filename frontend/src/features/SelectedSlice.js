import { createSlice } from '@reduxjs/toolkit';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    groupId: null,
    nodeId: null,
  },
  reducers: {
    selectGroup: (state, action) => {
      state.groupId = action.payload;
    },
    selectNode: (state, action) => {
      state.nodeId = action.payload;
    },
  },
});

export const { selectGroup, selectNode } = selectedSlice.actions;
export default selectedSlice.reducer;
