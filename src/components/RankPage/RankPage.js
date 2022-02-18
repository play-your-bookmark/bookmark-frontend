import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import MainRankPage from "./MainRankPage/MainRankPage";
import SubRankPage from "./SubRankPage/SubRankPage";
import SearchBar from "./SearchBar";

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

  const timerProps = {
    isPlaying: true,
    size: 100,
    strokeWidth: 8,
    duration: 5,
    initialRemainingTime: 5,
    colors: "#f2c84d",
  };

  return (
    <div>
      <RankHeader>
        {!keyword ? <SearchBar position="inline-block" /> : <SearchBar position="flex" />}
        {!keyword && (
          <div className="loader-wrapper">
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
          </div>
        )}
      </RankHeader>
      {!keyword ? <MainRankPage /> : <SubRankPage />}
    </div>
  );
}
