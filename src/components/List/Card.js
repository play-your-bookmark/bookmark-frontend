import React from "react";
import styled from "styled-components";

const FolderWrapper = styled.button`
  display: flex;
  justify-content: center;
  background-color: white;
  margin: 5px;
  padding: 5px;
  width: 400px;
`;

function handleClickRetrieveLinks(e) {
  e.preventDefault();
  console.log(e.target.value);
}

export default function Card({ folder }) {
  return (
    <FolderWrapper
      type="button"
      onClick={() => {
        handleClickRetrieveLinks();
      }}
    >
      {folder.title}
    </FolderWrapper>
  );
}
