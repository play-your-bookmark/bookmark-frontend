import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ObjectId } from "bson";
import {
  moveFolder,
  addFolder,
  addBookmark,
  deleteFolderInDB,
  getFolderDetail,
} from "../../redux/slices/folderSlices";
import { dragEnd, dragEnter, dragLeave, dragOver, dragStart, drop } from "../../utils/dnd";
import Button from "./Button";
import Category from "../Category/Category";
import FolderDetail from "./FolderDetail";

export default function FolderTree({ subTree }) {
  const dispatch = useDispatch();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [grabFolder, setGrabFolder] = useState("");

  const handleDragEnter = (e) => {
    dragEnter(e);
    e.target.classList.add("droppable");
  };

  const handleDragleave = (e) => {
    dragLeave(e);
    e.target.classList.remove("droppable");
  };

  const handleDragOver = (e) => {
    dragOver(e);
  };

  const handleDragStart = (e) => {
    dragStart(e);
    setGrabFolder(e.target);
    e.dataTransfer.setData("type", "folder");
  };

  const handleDragEnd = (e) => {
    dragEnd(e);
  };

  const handleDrop = (e) => {
    drop(e);
    e.target.classList.remove("droppable");

    const dataType = e.dataTransfer.getData("type");
    const targetLocationId = e.target.dataset._id;

    if (dataType === "folder") {
      const grabFolderId = grabFolder.dataset._id;
      if (targetLocationId !== grabFolderId) {
        dispatch(moveFolder({ targetLocationId, grabFolderId }));
      }

      return;
    }

    const newBookmark = {
      title: e.dataTransfer.getData("title"),
      url: e.dataTransfer.getData("url"),
      visit_time: e.dataTransfer.getData("visit_time"),
    };

    dispatch(addBookmark({ newBookmark, targetLocationId }));
  };

  const handleAddButton = (e) => {
    e.stopPropagation();
    const targetLocation = subTree[0];
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
    const targetFolder = subTree[0];
    dispatch(deleteFolderInDB(targetFolder));
  };

  const handleFolderDetailButton = (e) => {
    const targetId = e.target.dataset._id;
    setIsDetailOpen(true);
    dispatch(getFolderDetail(targetId));
  };

  return (
    <li
      key={subTree[0]}
      data-_id={subTree[0]}
      draggable
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragleave}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      <div className="folder" data-_id={subTree[0]} onDoubleClick={handleFolderDetailButton}>
        - {subTree[1]}
      </div>
      {isDetailOpen && subTree[0] !== "root" && (
        <FolderDetail target={subTree[0]} isOpen={isDetailOpen} setIsOpen={setIsDetailOpen} />
      )}
      <Category isOpen={isCategoryOpen} setIsOpen={setIsCategoryOpen} />
      <Button name="add" type="button" onClickAction={handleAddButton} />
      <Button name="delete" type="button" onClickAction={handleDeleteButton} />
      {subTree.length >= 3 &&
        subTree.map((child, index) => {
          if (index < 3) {
            return;
          }

          return <FolderTree subTree={child} />;
        })}
    </li>
  );
}
