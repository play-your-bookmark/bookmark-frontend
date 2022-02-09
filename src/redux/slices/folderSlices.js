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
  initialState: {
    selectedFolder: null,
  },
  reducers: {
    moveFolder: (state, action) => {
      const { targetLocationId, grabFolderId } = action.payload;
      const grabFolderIndex = state.folderList.findIndex((folder) => folder.id === grabFolderId);
      const targetFolderIndex = state.folderList.findIndex(
        (folder) => folder.id === targetLocationId,
      );
      const targetFolder = state.folderList[targetFolderIndex];

      const checkParent = (grabIndex, targetIndex) => {
        const grabFolder = state.folderList[grabIndex];
        const targetFolder = state.folderList[targetIndex];

        if (targetFolder.parent_folder === "root") {
          return true;
        }

        if (grabFolder.id === targetFolder.parent_folder) {
          return false;
        }

        const upperFolderIndex = state.folderList.findIndex(
          (folder) => folder.id === targetFolder.parent_folder,
        );

        return checkParent(grabIndex, upperFolderIndex);
      };

      if (targetFolder.id === "root" || checkParent(grabFolderIndex, targetFolderIndex)) {
        state.folderList[grabFolderIndex].parent_folder = targetLocationId;
      }
    },
    addFolder: (state, action) => {
      state.folderList.push(action.payload);
    },
    addBookmark: (state, action) => {
      const { targetLocationId } = action.payload;
      const targetFolderIndex = state.folderList.findIndex(
        (folder) => folder.id === targetLocationId,
      );
      const targetFolder = state.folderList[targetFolderIndex];
      targetFolder.bookmark.push(action.payload.newBookmark);
    },
    selectFolder: (state, action) => {
      state.selectedFolder = action.payload;
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

export const { moveFolder, addFolder, addBookmark, selectFolder } = folderSlices.actions;
export default folderSlices.reducer;
