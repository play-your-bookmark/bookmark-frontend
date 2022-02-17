import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import List from "../../List/List";

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const TitleWrapper = styled.h2`
  display: flex;
  justify-content: center;
`;

export default function SubRankPage() {
  const keyword = useSelector((state) => state.keyword.keyword);

  return (
    <ListWrapper>
      <div>
        <TitleWrapper># {keyword}</TitleWrapper>
        <List
          category={keyword}
          width={500}
          height={550}
          origin="keywordCategory"
          color="#5587f5"
        />
      </div>
      <div>
        <TitleWrapper>📕 FOLDER LINK</TitleWrapper>
        <List width={800} height={550} color="#F2C84D" />
      </div>
    </ListWrapper>
  );
}
