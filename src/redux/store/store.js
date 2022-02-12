import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import folderReducer from "../slices/folderSlices";
import linkReducer from "../slices/linkSlices";
import keywordReducer from "../slices/keywordSlices";
import categoryFolderReducer from "../slices/categoryFolderSlices";

const store = configureStore({
  reducer: {
    folder: folderReducer,
    categoryFolder: categoryFolderReducer,
    link: linkReducer,
    keyword: keywordReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
