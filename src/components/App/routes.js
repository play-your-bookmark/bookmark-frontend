import { Navigate, Outlet } from "react-router-dom";
import isLoggedIn from "../../utils/isLoggedIn";

import Login from "../../components/Login/Login";
import RankPage from "../../components/RankPage/RankPage";
import Header from "../../components/Header/Header";


const routes = (auth) => [
  {
    path: "/",
    element: isLoggedIn ? <RankPage/> : <Navigate to="/login"/>,
  },
  {
    path: "/login",
    element: <Login auth={auth}/>
  },
]

export default routes;
