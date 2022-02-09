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

function handleClickRetrieveLinks(origin, onSelect, e) {
  e.preventDefault();
  // 폴더 클릭 시 담긴 링크 조회하는 이벤트

  if (origin === "keywordCategory") {
    // 모달 띄워서 조회X
    onSelect(e.target.value);
  } else if (origin === "mainCategory") {
    // 모달 띄워서 조회O
  }
}

export default function Card({ folder, origin, onSelect }) {
  return (
    <FolderWrapper
      type="button"
      value={folder}
      onClick={(e) => {
        handleClickRetrieveLinks(origin, onSelect, e);
      }}
    >
      {folder.title}
    </FolderWrapper>
  );
}
