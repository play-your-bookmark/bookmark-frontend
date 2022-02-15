import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { moveFolder, addBookmark } from "../../redux/slices/folderSlices";
import { dragEnd, dragEnter, dragLeave, dragOver, dragStart, drop } from "../../utils/dnd";
import Folder from "./Folder";

const FolderTreeWrapper = styled.ul`
  .drag-target {
    background-color: rgb(184, 184, 250);
    cursor: grabbing;
  }

  .clicked {
    background-color: aqua;
  }

  .droppable {
    opacity: 0.4;
  }
`;

export default function FolderTree({ subTree }) {
  const dispatch = useDispatch();
  const [grabFolder, setGrabFolder] = useState("");
  const [isToggled, setIsToggled] = useState(false);

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
      <il>
        <div
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
          <Folder folder={subTree} />
          {subTree.length >= 3 &&
            subTree.map((child, index) => {
              if (index < 3) {
                return;
              }

              return <FolderTree subTree={child} />;
            })}
        </div>
      </il>
    </FolderTreeWrapper>
  );
}
