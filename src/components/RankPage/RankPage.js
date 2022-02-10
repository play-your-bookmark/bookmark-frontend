import React from "react";
import { useSelector } from "react-redux";

import MainRankPage from "./MainRankPage/MainRankPage";
import SubRankPage from "./SubRankPage/SubRankPage";

export default function RankPage() {
  const keyword = useSelector((state) => state.keyword.keyword);

  return <div>{!keyword ? <MainRankPage /> : <SubRankPage />}</div>;
}
