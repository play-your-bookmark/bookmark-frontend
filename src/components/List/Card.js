import React from "react";
import styled from "styled-components";

const FolderWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  margin: 5px;
  padding: 5px;
  width: 400px;
`;

export default function Card({ folder }) {
  return (
    <FolderWrapper>
      <div>{folder.title}</div>
    </FolderWrapper>
  );
}
