import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MainRankPage from "./MainRankPage/MainRankPage";
import SubRankPage from "./SubRankPage/SubRankPage";
import SearchBar from "./SearchBar";
import Loader from "../Loader/Loader";

const RankHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  justify-content: space-between;
  padding: 20px 20px;
  align-items: center;

  .loader-wrapper {
    position: absolute;
    right: 100px;
  }
`;

const ElapsedTime = styled.div`
  display: flex;
  justify-content: center;
`;

export default function RankPage() {
  const keyword = useSelector((state) => state.keyword.keyword);
  const loadingTime = useSelector((state) => state.timer.second);

  return (
    <div>
      <RankHeader>
        {!keyword ? <SearchBar position="inline-block" /> : <SearchBar position="flex" />}
        {!keyword && (
          <div className="loader-wrapper">
            <Loader height={40} width={40} loadingTime={loadingTime} />
          </div>
        )}
      </RankHeader>
      {!keyword ? <MainRankPage /> : <SubRankPage />}
    </div>
  );
}
