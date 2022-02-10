import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import List from "../../List/List";
// mockdata 사용중
import folders from "../../../utils/folders.json";

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleWrapper = styled.h2`
  display: flex;
  justify-content: center;
`;

export default function SubRankPage() {
  const keyword = useSelector((state) => state.keyword.keyword);

  return (
    <ListWrapper>
      <List category={keyword} origin="keywordCategory" />
      <List />
    </ListWrapper>
  );
}
