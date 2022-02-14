import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MainRankPage from "./MainRankPage/MainRankPage";
import SubRankPage from "./SubRankPage/SubRankPage";
import SearchBar from "./SearchBar";
import Loader from "../Loader/Loader";

const RankHeader = styled.div`
  display: flex;
  align-items: center;
`;

const LoaderWrapper = styled.div`
  display: flex;
`;

const CounterWrapper = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
  font-size: 12px;
`;

export default function RankPage() {
  const keyword = useSelector((state) => state.keyword.keyword);
  const loadingTime = useSelector((state) => state.timer.second);

  return (
    <div>
      <RankHeader>
        <SearchBar />
        {!keyword && (
          <LoaderWrapper>
            <Loader height={30} width={30} />
            <CounterWrapper>{loadingTime}초 뒤 업데이트</CounterWrapper>
          </LoaderWrapper>
        )}
      </RankHeader>
      {!keyword ? <MainRankPage /> : <SubRankPage />}
    </div>
  );
}
