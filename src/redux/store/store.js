import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import folderReducer from "../slices/folderSlices";
import linkReducer from "../slices/linkSlices";
import keywordReducer from "../slices/keywordSlices";
import userSlices from "../slices/userSlices";

const store = configureStore({
  reducer: {
    folder: folderReducer,
    link: linkReducer,
    keyword: keywordReducer,
    user: userSlices,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
