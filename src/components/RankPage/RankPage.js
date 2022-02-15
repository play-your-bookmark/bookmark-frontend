import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import MainRankPage from "./MainRankPage/MainRankPage";
import SubRankPage from "./SubRankPage/SubRankPage";
import SearchBar from "./SearchBar";

const RankHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoaderWrapper = styled.div`
  display: flex;
  padding-right: 50px;
`;

const CounterWrapper = styled.div`
  display: flex;
  width: 300px;
  align-items: center;
  font-size: 20px;
`;

const ElapsedTime = styled.div`
  display: flex;
  justify-content: center;
`;

export default function RankPage() {
  const keyword = useSelector((state) => state.keyword.keyword);
  const loadingTime = useSelector((state) => state.timer.second);
  const timerProps = {
    isPlaying: true,
    size: 100,
    strokeWith: 1,
    duration: 5,
    initialRemainingTime: process.env.REACT_APP_RANK_PAGE_LOADING_DELAY,
    colors: ["#004777", "#F7B801", "#A30000", "#A30000"],
    colorsTime: [7, 5, 2, 0],
  };

  return (
    <div>
      <RankHeader>
        <SearchBar />
        {!keyword && (
          <LoaderWrapper>
            <CountdownCircleTimer
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...timerProps}
              onComplete={() => {
                return { shouldRepeat: true, delay: 1 };
              }}
            >
              {({ elapsedTime }) => {
                return (
                  <div className="time-wrapper">
                    <ElapsedTime>{Math.floor(elapsedTime)}</ElapsedTime>
                    <div>seconds</div>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          </LoaderWrapper>
        )}
      </RankHeader>
      {!keyword ? <MainRankPage /> : <SubRankPage />}
    </div>
  );
}
