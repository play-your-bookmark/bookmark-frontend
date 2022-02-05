import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "../slices/folderSlices";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    folder: folderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;