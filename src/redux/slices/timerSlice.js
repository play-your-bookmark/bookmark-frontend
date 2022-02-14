import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    second: process.env.REACT_APP_RANK_PAGE_LOADING_DELAY / 1000,
  },
  reducers: {
    updateSecond: (state, action) => {
      state.second += action.payload;
    },
  },
});

export const { updateSecond } = timerSlice.actions;
export default timerSlice.reducer;
