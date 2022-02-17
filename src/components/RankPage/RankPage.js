import React from "react";
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

const ElapsedTime = styled.div`
  display: flex;
  justify-content: center;
  font-family: sans-serif;
`;

export default function RankPage() {
  const keyword = useSelector((state) => state.keyword.keyword);

  const timerProps = {
    isPlaying: true,
    size: 100,
    strokeWidth: 6,
    duration: 5,
    initialRemainingTime: 5,
    colors: "#218380",
  };

  return (
    <div>
      <RankHeader>
        {!keyword ? <SearchBar position="inline-block" /> : <SearchBar position="flex" />}
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
                    <ElapsedTime>{Math.ceil(5 - elapsedTime)}</ElapsedTime>
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
