import React from "react";
import styled from "styled-components";
// mockdata 사용
import category from "../../../utils/category.json";
import List from "../../List/List";

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleWrapper = styled.h2`
  display: flex;
  justify-content: center;
`;

export default function MainRankPage() {
  return (
    <ListWrapper>
      <div>
        <TitleWrapper># {category.mainCategory[0].name}</TitleWrapper>
        <List category={category.mainCategory[0].name} />
      </div>
      <div>
        <TitleWrapper># {category.mainCategory[1].name}</TitleWrapper>
        <List category={category.mainCategory[1].name} />
      </div>
      <div>
        <TitleWrapper># {category.mainCategory[2].name}</TitleWrapper>
        <List category={category.mainCategory[2].name} />
      </div>
    </ListWrapper>
  );
}
