import { configureStore } from '@reduxjs/toolkit'
import groupsReducer from '../features/GroupsSlice'
import metricsReducer from '../features/MetricsSlice'
import selectedReducer from '../features/SelectedSlice'

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    metrics: metricsReducer,
    selected: selectedReducer,
  },
});
