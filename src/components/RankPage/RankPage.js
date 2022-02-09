import React, { useState } from "react";
import MainRankPage from "./MainRankPage/MainRankPage";
import SubRankPage from "./SubRankPage/SubRankPage";

export default function RankPage() {
  const [isSearching, setIsSearching] = useState(false);

  return <div>{!isSearching ? <MainRankPage /> : <SubRankPage />}</div>;
}
