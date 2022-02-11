import { createSlice } from "@reduxjs/toolkit";

const keywordSlices = createSlice({
  name: "keyword",
  initialState: {
    keyword: null,
  },
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { setKeyword } = keywordSlices.actions;
export default keywordSlices.reducer;
