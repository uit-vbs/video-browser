import { configureStore } from '@reduxjs/toolkit';
import relevantFeedbackReducer from 'redux/slices/relevantFeedbackSlice';

export default configureStore({
  reducer: {
    relevantFeedbacks: relevantFeedbackReducer,
  },
});