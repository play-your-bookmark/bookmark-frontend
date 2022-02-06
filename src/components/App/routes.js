import { Navigate, Outlet } from "react-router-dom";
import isLoggedIn from "../../utils/isLoggedIn";

import Login from "../../components/Login/Login";
import RankPage from "../../components/RankPage/RankPage";
import FolderEditPage from "../../components/FolderEditPage/FolderEditPage"
import Header from "../Layout/Header/Header";
import Dnd from "../Dnd/Dnd";

const routes = (auth) => [
  {
    path: "/app",
    //element: isLoggedIn() ? <Header/> : <Navigate to="/auth/login" />,
    children: [
      { path: "/app/dnd", element: <Dnd />},
      { path: "/app/rankpage", element: <RankPage />},
      { path: "/app/editpage", element: <FolderEditPage />},
      { path: "/app", element: <Navigate to="/app/rankpage" />}
    ]
  },
  {
    path: "/",
    element: !isLoggedIn() ? <Navigate to="/auth/login" /> : <Navigate to="/app/rankpage"/>,
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      { path: "/auth/login", element: <Login auth={auth} />}
    ]
  }
]

export default routes;
