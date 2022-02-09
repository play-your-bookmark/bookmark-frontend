import React from "react";
import styled from "styled-components";
// mockdata 사용
import folders from "../../utils/folders.json";
import Card from "./Card";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: skyblue;
  margin: 10px;
  height: 500px;
  width: 450px;
  z-index: 1;
`;

const FolderTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function List({ category, selectedFolder }) {
  // mockdata 사용 (원래는 axios로 카테고리에 맞는 폴더 전부요청)

  console.log(selectedFolder);
  const folderArray = category
    ? folders.map((folder, index) => {
        if (index === 0) return;
        const categoryArray = folders[index].category.split("/");

        if (category === categoryArray[0] || category === categoryArray[1]) {
          return folder;
        }

        return null;
      })
    : null;

  return (
    <CardWrapper>
      {category &&
        folderArray.map((folder) => {
          if (!folder) return;

          return (
            <FolderTitleWrapper key={folder.title}>
              <Card folder={folder} />
            </FolderTitleWrapper>
          );
        })}
      {selectedFolder && selectedFolder.bookmark.map((link) => <LinkWrapper>{link}</LinkWrapper>)}
    </CardWrapper>
  );
}
