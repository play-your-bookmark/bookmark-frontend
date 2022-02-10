import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { selectFolder } from "../../redux/slices/folderSlices";

const FolderWrapper = styled.button`
  display: flex;
  justify-content: center;
  background-color: white;
  margin: 5px;
  padding: 5px;
  width: 400px;
`;

function handleClickRetrieveLinks(origin, folder, dispatch, e) {
  e.preventDefault();
  // 폴더 클릭 시 담긴 링크 조회하는 이벤트

  if (origin === "keywordCategory") {
    // 모달 띄워서 조회X
    dispatch(selectFolder(folder));
  } else if (origin === "mainCategory") {
    // 모달 띄워서 조회O -> 추후 폴더 백엔드 및 폴더 조회 모달 구축 시 connect 예정
  }
}

export default function Card({ folder, origin }) {
  const dispatch = useDispatch();

  return (
    <FolderWrapper
      type="button"
      onClick={(e) => {
        handleClickRetrieveLinks(origin, folder, dispatch, e);
      }}
    >
      {folder.title}
    </FolderWrapper>
  );
}
