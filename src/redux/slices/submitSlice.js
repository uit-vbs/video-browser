import { createSlice } from '@reduxjs/toolkit';
import { getMiddleFrame, getTimeFormatted as getDatetimeFormatted, getTransitionKey, getVideoName } from 'utils';

const getCsvRow = (row, frameId) => `${getVideoName(row)},${frameId}`;

const MAX_ROWS = 100;
const SKIP_FRAMES = 20;

export const submitSlice = createSlice({
  name: 'submissions',
  initialState: [],
  reducers: {
    addSubmission: (state, action) => { 
      const idx = state.findIndex(t => getTransitionKey(t) === getTransitionKey(action.payload));
      if (idx == -1) {
        state.push(action.payload);
      } else {
        state.splice(idx, 1);
      }
    },
    resetSubmissions: () => { },
    submit: (state, _) => {
      let submissions = JSON.parse(JSON.stringify(state)); // deep copy
      let deleted = {};
      let rowCount = MAX_ROWS;
      let results = [];
      while (rowCount > 0 && submissions.length > Object.keys(deleted).length) {
        submissions.forEach(transition => {
          if (getTransitionKey(transition) in deleted) {
            return;
          }
          let rowCountSubmission = Math.ceil(rowCount / 2);
          let index = transition?.submissionIndex || 1;
          while (true) {
            const frameId = getMiddleFrame(transition) + SKIP_FRAMES * Math.floor(index / 2) * (index % 2 == 0 ? 1 : -1);
            if (transition?.frame_start > frameId || frameId > transition?.frame_end) {
              deleted[getTransitionKey(transition)] = true;
              break;
            }
            rowCount -= 1;
            rowCountSubmission -= 1;
            index += 1;
            results.push(getCsvRow(transition, frameId));
            if (rowCount == 0 || rowCountSubmission == 0) {
              deleted[getTransitionKey(transition)] = true;
              break;
            }
          }
        })
      }

      const blob = new Blob(
        [results.map(String).join('\n')],
        { type: "text/csv;charset=utf-8;" }
      );
      const url = URL.createObjectURL(blob);

      const pom = document.createElement('a');
      pom.href = url;
      pom.setAttribute('download', `query_${getDatetimeFormatted()}.csv`);
      pom.click();
    },
  },
});

// this is for dispatch
export const { addSubmission, resetSubmissions, submit } = submitSlice.actions;

// this is for configureStore
export default submitSlice.reducer;
