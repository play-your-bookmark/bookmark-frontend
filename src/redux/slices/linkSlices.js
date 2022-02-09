import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import req from "../../utils/api";

export const fetchLinkHistory = createAsyncThunk(
  "get/links",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await req("get", "/link/", { params: payload }, true, (res) => res);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const linkSlices = createSlice({
  name: "links",
  initialState: {
    linkList: [],
    isLoaded: false,
    calculatedDate: "",
  },
  reducers: {
    toggleIsLoaded(state) {
      state.isLoaded = !state.isLoaded;
    },
  },
  extraReducers: {
    [fetchLinkHistory.pending]: (state, action) => {},
    [fetchLinkHistory.fulfilled]: (state, action) => {
      action.payload.map((link) => {
        link.key = nanoid();

        return link;
      });

      state.linkList = state.linkList.concat(action.payload);
    },
    [fetchLinkHistory.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { toggleIsLoaded } = linkSlices.actions;
export default linkSlices.reducer;
