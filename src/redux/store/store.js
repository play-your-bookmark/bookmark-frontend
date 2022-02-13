import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import folderReducer from "../slices/folderSlices";
import linkReducer from "../slices/linkSlices";
import keywordReducer from "../slices/keywordSlices";
import categoryFolderReducer from "../slices/categoryFolderSlices";
import userReducer from "../slices/userSlices";
import timerReducer from "../slices/timerSlice";

const store = configureStore({
  reducer: {
    folder: folderReducer,
    categoryFolder: categoryFolderReducer,
    link: linkReducer,
    keyword: keywordReducer,
    user: userReducer,
    timer: timerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
