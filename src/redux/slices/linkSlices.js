import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchLinkHistory = createAsyncThunk(
  "get/links",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //아직 벡엔드와 연결이 안되어있어 mock data를 사용했습니다.
      const { data } = await axios.get("/linksCopy.json");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
)

const linkSlices = createSlice({
  name: "links",
  initialState: {
    linkList: [],
    isLoaded: false,
  },
  reducers: {
    toggleIsLoaded(state) {
      state.isLoaded = !state.isLoaded;
    }
  },
  extraReducers: {
    [fetchLinkHistory.pending]: (state, action) => {
    },
    [fetchLinkHistory.fulfilled]: (state, action) => {
      state.linkList = state.linkList.concat(action.payload);
    },
    [fetchLinkHistory.rejected]: (state, action) => {
      state.error = action.payload;
    }
  }
})

export const { toggleIsLoaded } = linkSlices.actions;
export default linkSlices.reducer;
