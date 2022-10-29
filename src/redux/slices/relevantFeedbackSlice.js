import { createSlice, current } from '@reduxjs/toolkit';
import { getTransitionKey } from 'utils';

const addFeedback = (feedbacks, transitionKey, transition) => {
  feedbacks[transitionKey] = transition;
}

const removeFeedback = (feedbacks, transitionKey) => {
  if (transitionKey in feedbacks) {
    delete feedbacks[transitionKey];
  }
}

const toggleFeedback = (thisFeedbacks, thatFeedbacks, transition) => {
  const transitionKey = getTransitionKey(transition);
  if (transitionKey in thisFeedbacks) {
    removeFeedback(thisFeedbacks, transitionKey);
  } else {
    removeFeedback(thatFeedbacks, transitionKey);
    addFeedback(thisFeedbacks, transitionKey, transition);
  }
}

export const relevantFeedbackSlice = createSlice({
  name: 'relevantFeedbacks',
  initialState: {
    positives: {},
    negatives: {},
  },
  reducers: {
    togglePositiveFeedback: (state, action) => toggleFeedback(state.positives, state.negatives, action.payload),
    toggleNegativeFeedback: (state, action) => toggleFeedback(state.negatives, state.positives, action.payload),
    clearAllFeedbacks: (state, _) => {
      state.positives = {};
      state.negatives = {};
      return state;
    }
  },
});

// this is for dispatch
export const { togglePositiveFeedback, toggleNegativeFeedback, clearAllFeedbacks } = relevantFeedbackSlice.actions;

// this is for configureStore
export default relevantFeedbackSlice.reducer;
