import { ObjectId } from "bson";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  moveFolder,
  addFolder,
  addBookmark,
  deleteFolder,
  deleteFolderInDB,
  fetchCreatedFolder,
} from "../../redux/slices/folderSlices";
import { dragEnd, dragEnter, dragLeave, dragOver, dragStart, drop } from "../../utils/dnd";

export default function FolderTree({ subTree }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [grabFolder, setGrabFolder] = useState("");
  // const [isToggled, setIsToggled] = useState(false);

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
    e.target.classList.remove("droppable");

    const dataType = e.dataTransfer.getData("type");

    if (dataType === "folder") {
      const grabFolderId = grabFolder.dataset._id;
      const targetLocationId = e.target.dataset._id;
      if (targetLocationId !== grabFolderId) {
        dispatch(moveFolder({ targetLocationId, grabFolderId }));

        return;
      }
    }

    const targetLocationId = e.target.dataset._id;

    const newBookmark = {
      title: e.dataTransfer.getData("title"),
      url: e.dataTransfer.getData("url"),
      visit_time: e.dataTransfer.getData("visit_time"),
    };

    dispatch(addBookmark({ newBookmark, targetLocationId }));
  };

  const handleFolderButton = (e) => {
    if (e.target.className === "add") {
      const targetLocation = e.currentTarget.dataset._id;
      const newFolderId = `${new ObjectId().toString()} new`;
      const newFolderName = `새폴더 ${Math.random()}`;
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
    }
    if (e.target.className === "delete") {
      const targetFolder = e.currentTarget.dataset._id;
      dispatch(deleteFolderInDB(targetFolder));
    }
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
      <div className="folder" data-_id={subTree[0]} onClick={handleFolderButton}>
        - {subTree[1]}
        <button className="add" type="button">
          add
        </button>
        <button className="delete" type="button">
          delete
        </button>
      </div>
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
