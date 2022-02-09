import React, { useState } from "react";
import { useSelector } from "react-redux";

import MainRankPage from "./MainRankPage/MainRankPage";
import SubRankPage from "./SubRankPage/SubRankPage";

export default function RankPage() {
  const [keyword, setKeyword] = useState("ReactJS");
  // const fetchedKeyword = useSelector((state) => state.keyword);

  return <div>{!keyword ? <MainRankPage /> : <SubRankPage keyword={keyword} />}</div>;
}
