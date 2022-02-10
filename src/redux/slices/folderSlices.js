import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import req from "../../utils/api";

export const fetchCreatedFolder = createAsyncThunk(
  "get/folders",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await req("get", "/folder/main", true, (res) => res);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const saveFolders = createAsyncThunk(
  "post/folders",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      await req("post", "/folder/new", { data: payload }, true, (res) => res);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteFolderInDB = createAsyncThunk(
  "delete/folders",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      if (payload.split(" ")[1]) {
        // 새폴더 일 경우 store에서만 삭제
        dispatch(deleteFolder(payload));
        return;
      }

      await req("delete", `/folder/${payload}`, { params: payload }, true, (res) => res);
      dispatch(fetchCreatedFolder());
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
      const grabFolderIndex = state.folderList.findIndex((folder) => folder._id === grabFolderId);
      const targetFolderIndex = state.folderList.findIndex(
        (folder) => folder._id === targetLocationId,
      );
      const targetFolder = state.folderList[targetFolderIndex];
      const rootFolder = state.folderList[0];

      const checkParent = (grabIndex, targetIndex) => {
        const grabFolder = state.folderList[grabIndex];
        const targetFolder = state.folderList[targetIndex];
        if (targetFolder.parent_folder === rootFolder._id) {
          return true;
        }

        if (grabFolder._id === targetFolder.parent_folder) {
          return false;
        }

        const upperFolderIndex = state.folderList.findIndex(
          (folder) => folder._id === targetFolder.parent_folder,
        );

        return checkParent(grabIndex, upperFolderIndex);
      };

      if (targetFolder._id === rootFolder._id || checkParent(grabFolderIndex, targetFolderIndex)) {
        state.folderList[grabFolderIndex].parent_folder = targetLocationId;
      }
    },
    addFolder: (state, action) => {
      state.folderList.push(action.payload);
    },
    addBookmark: (state, action) => {
      const { targetLocationId } = action.payload;
      const targetFolderIndex = state.folderList.findIndex(
        (folder) => folder._id === targetLocationId,
      );
      const targetFolder = state.folderList[targetFolderIndex];
      targetFolder.bookmark.push(action.payload.newBookmark);
    },
    selectFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    deleteFolder: (state, action) => {
      const targetFolderId = action.payload;
      const targetFolderIndex = state.folderList.findIndex(
        (folder) => folder._id === targetFolderId,
      );
      state.folderList.splice(targetFolderIndex, 1);
    },
  },
  extraReducers: {
    [fetchCreatedFolder.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCreatedFolder.fulfilled]: (state, action) => {
      // buildTree를 돌리기 위해 root folder를 0번 인덱스로 두는 작업
      const fetchedFolderList = action.payload;
      const rootIndex = fetchedFolderList.findIndex((folder) => folder.title === "ROOT");
      const rootFolder = fetchedFolderList.splice(rootIndex, 1);
      fetchedFolderList.splice(0, 0, rootFolder[0]);
      state.folderList = action.payload;
      state.loading = false;
    },
    [fetchCreatedFolder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [saveFolders.pending]: (state, action) => {
      state.loading = true;
    },
    [saveFolders.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [saveFolders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteFolderInDB.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteFolderInDB.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteFolderInDB.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { moveFolder, addFolder, addBookmark, selectFolder, deleteFolder } =
  folderSlices.actions;
export default folderSlices.reducer;
