import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { selectFolder } from "../../redux/slices/folderSlices";

const FolderWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 400px;
  height: 40px;
  border-radius: 15px;
  box-shadow: rgba(26, 26, 26, 0.4) 0px 3px 2px 2px;
  cursor: pointer;

  :hover {
    box-shadow: rgba(26, 26, 26, 1) 0px 3px 2px 2px;
    font-weight: bold;
  }
`;

export default function Card({ folder, origin, setIsModalOpen }) {
  const dispatch = useDispatch();

  return (
    <FolderWrapper
      type="button"
      onClick={async (e) => {
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
