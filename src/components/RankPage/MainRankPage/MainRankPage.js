import React from "react";
import styled from "styled-components";
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
      {category.mainCategory.map((index) => (
        <div>
          <TitleWrapper># {category.mainCategory[index].name}</TitleWrapper>
          <List category={category.mainCategory[index].name} />
        </div>
      ))}
    </ListWrapper>
  );
}
