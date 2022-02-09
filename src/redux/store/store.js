import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import folderReducer from "../slices/folderSlices";
import linkReducer from "../slices/linkSlices";
import keywordReducer from "../slices/keywordSlices";

const store = configureStore({
  reducer: {
    folder: folderReducer,
    link: linkReducer,
    keyword: keywordReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
