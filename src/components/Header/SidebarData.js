import React from "react";

import { BiUser } from "react-icons/bi";
import { CgListTree } from "react-icons/cg";
import { GiMedallist } from "react-icons/gi";
import "./NavBar.css";

const SidebarData = [
  {
    title: "User",
    path: "/app/mypage",
    icon: <BiUser />,
    cName: "nav-text",
  },
  {
    title: "Edit",
    path: "/app/editpage",
    icon: <CgListTree />,
    cName: "nav-text",
  },
  {
    title: "Rank",
    path: "/app/rankpage",
    icon: <GiMedallist />,
    cName: "nav-text",
  },
];

export default SidebarData;
