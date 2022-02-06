import React from "react";
import { Outlet } from "react-router-dom";

export default function Header () {
  return (
    <div>
      <h1>헤더입니다</h1>
      <Outlet />
    </div>
  )
}