import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "../slices/folderSlices";
import linkReducer from "../slices/linkSlices";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    folder: folderReducer,
    link: linkReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
