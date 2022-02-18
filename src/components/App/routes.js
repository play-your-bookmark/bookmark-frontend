import { Navigate, Outlet } from "react-router-dom";
import isLoggedIn from "../../utils/isLoggedIn";

import Header from "../Header/Header";
import Login from "../Login/Login";
import RankPage from "../RankPage/RankPage";
import FolderEditPage from "../FolderEditPage/FolderEditPage";
import Header from "../Header/Header";
import UserPage from "../UserPage/UserPage";

const routes = (auth) => [
  {
    path: "/app",
    element: isLoggedIn() ? <Header auth={auth} /> : <Navigate to="/auth/login" />,
    children: [
      { path: "/app/rankpage", element: <RankPage /> },
      { path: "/app/editpage", element: <FolderEditPage /> },
      { path: "/app/mypage", element: <UserPage /> },
      { path: "/app/userpage/:id", element: <UserPage /> },
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
    children: [{ path: "/auth/login", element: <Login auth={auth} /> }],
  },
];

export default routes;
