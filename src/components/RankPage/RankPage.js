import React from "react";
import { useSelector } from "react-redux";

import MainRankPage from "./MainRankPage/MainRankPage";
import SubRankPage from "./SubRankPage/SubRankPage";
import SearchBar from "./SearchBar";
import Loader from "../Loader/Loader";

export default function RankPage() {
  const keyword = useSelector((state) => state.keyword.keyword);

  return (
    <div>
      <div>
        <Loader />
      </div>
      <SearchBar />
      {!keyword ? <MainRankPage /> : <SubRankPage />}
    </div>
  );
}
