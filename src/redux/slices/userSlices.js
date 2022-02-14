import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import req from "../../utils/api";

export const getGitubUserInfo = createAsyncThunk(
  "get/user/github",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const userObjectId = payload.userId.id;
      const { data } = await req(
        "get",
        `/user/${userObjectId}`,
        { params: userObjectId },
        (res) => res,
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const setGitubUserInfo = createAsyncThunk(
  "put/user/github",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const userId = payload.userId.user;
      const gitHubName = payload.name;
      const { data } = await req(
        "put",
        `/user/${userId}/${gitHubName}`,
        { data: { userId, gitHubName } },
        (res) => res,
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUserOfSelectedFolder = createAsyncThunk(
  "put/user/selected",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await req("get", `/user/${payload}`, { params: payload }, (res) => res);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const userSlices = createSlice({
  name: "user",
  initialState: {
    userGithubInfo: {
      url: null,
      avatarUrl: null,
      isMyPage: null,
      name: null,
    },
  },
  reducers: {},
  extraReducers: {
    [getGitubUserInfo.pending]: (state, action) => {},
    [getGitubUserInfo.fulfilled]: (state, action) => {
      state.userGithubInfo = {
        url: action.payload.url,
        avatarUrl: action.payload.avatar_url,
        isMyPage: action.payload.isMyPage,
        name: action.payload.name,
      };
    },
    [getGitubUserInfo.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [setGitubUserInfo.pending]: (state, action) => {},
    [setGitubUserInfo.fulfilled]: (state, action) => {
      state.userGithubInfo = {
        ...state.userGithubInfo,
        url: action.payload.url,
        avatarUrl: action.payload.avatarUrl,
      };
    },
    [setGitubUserInfo.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getUserOfSelectedFolder.pending]: (state, action) => {},
    [getUserOfSelectedFolder.fulfilled]: (state, action) => {
      state.selectedUserName = action.payload.name;
    },
    [getUserOfSelectedFolder.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getMyObjectId } = userSlices.actions;
export default userSlices.reducer;
