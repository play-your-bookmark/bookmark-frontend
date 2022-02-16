import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { moveFolder, addBookmark } from "../../redux/slices/folderSlices";
import { dragEnd, dragEnter, dragLeave, dragOver, dragStart, drop } from "../../utils/dnd";
import Folder from "./Folder";

const FolderTreeWrapper = styled.ul`
  display: flex;

  li {
    margin-top: 15px;
  }

  .drag-target .folder:not(ul, li) {
    background-color: #f2c84d;
    cursor: grabbing;
  }

  .droppable:not(ul, li, .add, .delete, button) {
    background-color: #5587f5;
    width: 330px;
    height: 45px;
    transition: 0.2s;
    opacity: 0.4;
  }
`;

export default function FolderTree({ subTree }) {
  const dispatch = useDispatch();
  const [grabFolder, setGrabFolder] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const handleDragEnter = (e) => {
    dragEnter(e);
    if (!e.target.classList.contains("buttons")) {
      e.target.classList.add("droppable");
    }
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

    if (!e.target.dataset._id) {
      return;
    }

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

  return (
    <FolderTreeWrapper>
      <li>
        <div
          key={subTree[0]}
          className="drag-item"
          data-_id={subTree[0]}
          draggable
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragleave}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
        >
          <Folder folder={subTree} />
          {subTree.length >= 3 &&
            subTree.map((child, index) => {
              if (index < 3) {
                return;
              }

              return <FolderTree subTree={child} />;
            })}
        </div>
      </li>
    </FolderTreeWrapper>
  );
}
