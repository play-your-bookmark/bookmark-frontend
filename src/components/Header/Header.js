import React from "react";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div>
      <h1>헤더입니다</h1>
      <SearchBar />
      <Outlet />
    </div>
  );
}
