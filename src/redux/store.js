import { configureStore } from '@reduxjs/toolkit';
import relevantFeedbackReducer from 'redux/slices/relevantFeedbackSlice';
import submitReducer from 'redux/slices/submitSlice';

export default configureStore({
  reducer: {
    relevantFeedbacks: relevantFeedbackReducer,
    submissions: submitReducer,
  },
});