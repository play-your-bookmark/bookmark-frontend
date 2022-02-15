import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import req from "../../utils/api";

export const fetchCreatedFolder = createAsyncThunk(
  "get/folders",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const objectId = payload.userObjectId.id;

      if (objectId) {
        const { data } = await req("get", "/folder/main", { params: objectId }, (res) => res, true);
        return data;
      }

      const { data } = await req("get", "/folder/main", {}, (res) => res, true);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchLikeFolder = createAsyncThunk(
  "get/folders/like",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const objectId = payload.userObjectId.id;

      if (objectId) {
        const { data } = await req("get", "/folder/like", { params: objectId }, (res) => res, true);
        return data;
      }

      const { data } = await req("get", "/folder/like", {}, (res) => res, true);
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
      await req("post", "/folder/new", { data: payload }, (res) => res, true);
      dispatch(fetchCreatedFolder());
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
        dispatch(deleteFolder(payload));

        return;
      }

      await req("delete", `/folder/${payload}`, { params: payload }, (res) => res, true);
      dispatch(fetchCreatedFolder());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const folderSlices = createSlice({
  name: "folders",
  initialState: {
    folderList: [],
    selectedFolder: null,
    category: {},
    targetFolder: {},
  },
  reducers: {
    moveFolder: (state, action) => {
      const { targetLocationId, grabFolderId } = action.payload;
      const grabFolderIndex = state.folderList.findIndex((folder) => folder._id === grabFolderId);
      const grabFolder = state.folderList[grabFolderIndex];
      if (grabFolder.parent_folder === targetLocationId) {
        return;
      }

      state.folderList[grabFolderIndex].parent_folder = targetLocationId;
    },
    addFolder: (state, action) => {
      state.folderList.push(action.payload);
    },
    addBookmark: (state, action) => {
      const { newBookmark, targetLocationId } = action.payload;
      const targetFolderIndex = state.folderList.findIndex(
        (folder) => folder._id === targetLocationId,
      );
      const targetFolder = state.folderList[targetFolderIndex];

      if (targetFolder.bookmark.findIndex((link) => link.url === newBookmark.url) === -1) {
        targetFolder.bookmark.push(newBookmark);
      }
    },
    deleteBookmark: (state, action) => {
      const index = action.payload;
      state.targetFolder.bookmark.splice(index, 1);
      const targetFolderIndex = state.folderList.findIndex(
        (folder) => folder._id === state.targetFolder._id,
      );

      state.folderList[targetFolderIndex].bookmark.splice(index, 1);
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
    selectCategory: (state, action) => {
      state.category = action.payload;
      const newFolderIndex = state.folderList.findIndex((folder) => folder.main_category === "");
      state.folderList[newFolderIndex].main_category = state.category.mainCategory;
      state.folderList[newFolderIndex].sub_category = state.category.subCategory;
    },
    getFolderDetail: (state, action) => {
      const targetId = action.payload;
      const targetIndex = state.folderList.findIndex((folder) => folder._id === targetId);
      state.targetFolder = state.folderList[targetIndex];
    },
    changeFolderDetail: (state, action) => {
      const { target } = action.payload;
      const targetIndex = state.folderList.findIndex((folder) => folder._id === target);
      state.folderList[targetIndex] = {
        ...state.folderList[targetIndex],
        ...action.payload,
      };
      state.targetFolder = { ...state.targetFolder, ...action.payload };
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
    [fetchLikeFolder.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchLikeFolder.fulfilled]: (state, action) => {
      state.likedFolder = action.payload;
      state.loading = false;
    },
    [fetchLikeFolder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  moveFolder,
  addFolder,
  addBookmark,
  deleteBookmark,
  selectFolder,
  deleteFolder,
  selectCategory,
  getFolderDetail,
  changeFolderDetail,
} = folderSlices.actions;
export default folderSlices.reducer;
