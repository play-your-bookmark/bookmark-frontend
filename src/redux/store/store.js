import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import folderReducer from "../slices/folderSlices";
import linkReducer from "../slices/linkSlices";
import keywordReducer from "../slices/keywordSlices";
<<<<<<< HEAD
import categoryFolderReducer from "../slices/categoryFolderSlices";
=======
import userSlices from "../slices/userSlices";
>>>>>>> 0f8f998db7c6228fd3ea2cf455bdc4d0cfdceded

const store = configureStore({
  reducer: {
    folder: folderReducer,
    categoryFolder: categoryFolderReducer,
    link: linkReducer,
    keyword: keywordReducer,
    user: userSlices,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
