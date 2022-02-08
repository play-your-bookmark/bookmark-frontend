import { Navigate, Outlet } from "react-router-dom";
import isLoggedIn from "../../utils/isLoggedIn";

import Login from "../Login/Login";
import RankPage from "../RankPage/RankPage";
import FolderEditPage from "../FolderEditPage/FolderEditPage";
import Header from "../Header/Header";
import Category from "./Category/Category";
import Tree from "../Tree/Tree";

const routes = (auth) => [
  {
    path: "/app",
    element: isLoggedIn() ? <Header /> : <Navigate to="/auth/login" />,
    children: [
      { path: "/app/rankpage", element: <RankPage /> },
      { path: "/app/editpage", element: <FolderEditPage /> },
      { path: "/app", element: <Navigate to="/app/rankpage" /> },
    ],
  },
  {
    path: "/",
    element: !isLoggedIn() ? <Navigate to="/auth/login" /> : <Navigate to="/app/rankpage" />,
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      { path: "/auth/login", element: <Category /> },
      { path: "/auth/tree", element: <Tree /> },
    ],

    // <Login auth={auth} />
  },
];

export default routes;
