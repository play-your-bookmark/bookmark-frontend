import React from "react";
import styled from "styled-components";
// mockdata 사용
import category from "../../../utils/category.json";
import List from "../../List/List";

const ListWrapper = styled.div`
  display: flex;
`;

export default function MainRankPage() {
  return (
    <ListWrapper>
      <div>
        <h2># {category.mainCategory[0].name}</h2>
        <List category={category.mainCategory[0].name} />
      </div>
      <div>
        <h2># {category.mainCategory[1].name}</h2>
        <List category={category.mainCategory[1].name} />
      </div>
      <div>
        <h2># {category.mainCategory[2].name}</h2>
        <List category={category.mainCategory[2].name} />
      </div>
    </ListWrapper>
  );
}
