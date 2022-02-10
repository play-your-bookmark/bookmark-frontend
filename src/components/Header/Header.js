import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";

const SearchBarWrapper = styled.div`
  .SearchBarWrapper {
    position: relative;
    z-index: 2;
  }
`;

const OutletWrapper = styled.div`
  .OutletWrapper {
    position: absolute;
    z-index: 1;
  }
`;

export default function Header() {
  return (
    <div>
      <div>
        <h1>헤더입니다</h1>
        <SearchBar className="SearchBarWrapper" />
      </div>
      <div>
        <Outlet className="OutletWrapper" />
      </div>
    </div>
  );
}
