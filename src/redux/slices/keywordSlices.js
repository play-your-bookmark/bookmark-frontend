import { createSlice } from "@reduxjs/toolkit";

export const keywordSlices = createSlice({
  name: "keyword",
  initialState: {},
  reducer: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { setKeyword } = keywordSlices.actions;
export default keywordSlices.reducer;
