import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import req from "../../utils/api";

export const fetchCreatedFolder = createAsyncThunk(
  "get/folders",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get("/foldersCopy.json");
      return data;
    } catch (error) {
      return error;
    }
  },
)

const folderSlices = createSlice({
  name: "folders",
  initialState: {},
  extraReducers: {
    [fetchCreatedFolder.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCreatedFolder.fulfilled]: (state, action) => {
      state.folderList = action.payload;
      state.loading = false;
    },
    [fetchCreatedFolder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
})

export default folderSlices.reducer;
