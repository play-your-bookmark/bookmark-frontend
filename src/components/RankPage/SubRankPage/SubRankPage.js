import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import List from "../../List/List";

import folders from "../../../utils/folders.json";

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleWrapper = styled.h2`
  display: flex;
  justify-content: center;
`;

export default function SubRankPage({ keyword }) {
  const [selectedFolder, setSelectedFolder] = useState(folders[1]);

  return (
    <ListWrapper>
      <List category={keyword} />
      <List selectedFolder={selectedFolder} />
    </ListWrapper>
  );
}
