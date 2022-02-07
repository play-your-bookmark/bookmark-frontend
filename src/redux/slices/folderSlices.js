import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import req from "../../utils/api";
// -> 서버 구축 이후 my_created_folder 불러올 때 사용
// -> 현재는 public folder에 넣어둔 folderCopy.json mock data 사용 중

export const fetchCreatedFolder = createAsyncThunk(
  "get/folders",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get("/foldersCopy.json");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const folderSlices = createSlice({
  name: "folders",
  initialState: {},
  reducers: {
    moveFolder: (state, action) => {
      const { targetId, grabFolderIndex } = action.payload;
      state.folderList[grabFolderIndex].parent_folder = targetId;
    },
  },
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
    },
  },
});

export const { moveFolder } = folderSlices.actions;
export default folderSlices.reducer;
