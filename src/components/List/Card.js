import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { selectFolder } from "../../redux/slices/folderSlices";

const FolderWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  margin: 5px;
  padding: 5px;
  width: 400px;
  border: 3px solid black;
  cursor: pointer;
  font-size: 20px;
`;

export default function Card({ folder, origin, setIsModalOpen }) {
  const dispatch = useDispatch();

  return (
    <FolderWrapper
      type="button"
      onClick={async (e) => {
        // 여전히 조회는 가능하고, like button만 막음
        dispatch(selectFolder(folder));

        if (origin === "mainCategory") {
          setIsModalOpen();
        }
      }}
    >
      {folder.title}
    </FolderWrapper>
  );
}
