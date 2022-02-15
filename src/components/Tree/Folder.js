import React, { useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { ObjectId } from "bson";
import styled from "styled-components";
import { getFolderDetail, addFolder, deleteFolderInDB } from "../../redux/slices/folderSlices";
import Button from "./Button";
import FolderDetail from "./FolderDetail";
import Category from "../Category/Category";

const FolderWrapper = styled.div`
  display: flex;

  .folder {
    display: flex;
    flex-direction: row;
    width: 300px;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
    cursor: pointer;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .add,
  .delete {
    color: #5587f5;
    cursor: pointer;
  }
`;

export default function Folder({ folder }) {
  const dispatch = useDispatch();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const DELETE_MESSAGE = "폴더를 삭제하시겠습니까?";

  const handleFolderDetailButton = (e) => {
    e.stopPropagation();
    const targetId = e.target.dataset._id;
    setIsDetailOpen(true);
    dispatch(getFolderDetail(targetId));
  };

  const handleAddButton = (e) => {
    e.stopPropagation();
    const targetLocation = folder[0];
    const newFolderId = `${new ObjectId().toString()} new`;
    const newFolderName = "새폴더";

    const newFolder = {
      _id: newFolderId,
      title: newFolderName,
      publisher: "",
      likes: [],
      bookmark: [],
      main_category: "",
      sub_category: "",
      parent_folder: targetLocation,
    };

    dispatch(addFolder(newFolder));
    setIsCategoryOpen(true);
  };

  const handleDeleteButton = (e) => {
    e.stopPropagation();

    if (window.confirm(DELETE_MESSAGE)) {
      const targetFolder = folder[0];
      dispatch(deleteFolderInDB(targetFolder));
    }
  };

  return (
    <FolderWrapper className="folder-wrapper">
      <Category isOpen={isCategoryOpen} setIsOpen={setIsCategoryOpen} />
      <div className="folder" data-_id={folder[0]} onDoubleClick={handleFolderDetailButton}>
        <FaFolder size="1.7rem" />
        {folder[1]}
        <div className="buttons">
          <Button name="add" type="button" onClickAction={handleAddButton} />
          <Button name="delete" type="button" onClickAction={handleDeleteButton} />
        </div>
      </div>
      {isDetailOpen && folder[0] !== "root" && (
        <FolderDetail target={folder[0]} isOpen={isDetailOpen} setIsOpen={setIsDetailOpen} />
      )}
    </FolderWrapper>
  );
}
