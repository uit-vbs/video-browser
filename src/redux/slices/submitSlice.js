import { createSlice } from '@reduxjs/toolkit';

export const submitSlice = createSlice({
  name: 'submissions',
  initialState: [],
  reducers: {
    addSubmission: (state, action) => { state.push(action.payload) },
    resetSubmissions: () => {},
    submit: () => {},
  },
});

// this is for dispatch
export const { addSubmission, resetSubmissions } = submitSlice.actions;

// this is for configureStore
export default submitSlice.reducer;
