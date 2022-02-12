import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import req from "../../utils/api";

export const fetchCategoryFolder = createAsyncThunk(
  "get/folders/category",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await req(
        "get",
        "/folder/category",
        { params: [payload.origin, payload.category] },
        (res) => res,
        true,
      );

      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  },
);

export const handleLike = createAsyncThunk(
  "put/folders/like",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await req(
        "put",
        `/folder/like/${payload[0]}/${payload[1]}`,
        { params: payload[2] },
        (res) => res,
        true,
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const categoryFolderSlices = createSlice({
  name: "categoryFolers",
  initialState: {
    fetchedCategoryFolder: {},
    checkedFolder: {},
  },
  reducers: {},
  extraReducers: {
    [fetchCategoryFolder.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCategoryFolder.fulfilled]: (state, action) => {
      state.fetchedCategoryFolder[action.payload.category] = action.payload.folders;
      state.loading = false;
    },
    [fetchCategoryFolder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [handleLike.pending]: (state, action) => {
      state.loading = true;
    },
    [handleLike.fulfilled]: (state, action) => {
      const { folder, index, origin, folderAction, id } = action.payload;

      if (typeof action.payload === "string") {
        return;
      }

      if (folderAction === "delete") {
        state.checkedFolder[id] = false;
      } else {
        state.checkedFolder[id] = true;
      }

      if (origin === "mainCategory") {
        const category = folder["main_category"];
        state.fetchedCategoryFolder[category][index].likes = [...folder.likes];
      } else {
        const category = folder["sub_category"];
        state.fetchedCategoryFolder[category][index].likes = [...folder.likes];
      }

      state.loading = false;
    },
    [handleLike.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default categoryFolderSlices.reducer;
