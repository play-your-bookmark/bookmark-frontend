import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FOLDERS from "../../utils/folders.json";
import { dragOver, dragStart, dragEnd, drop } from "../../utils/dnd";
import { buildTree } from "../../utils/tree";

function Dnd() {
  const [ folderList, setFolderList ] = useState(FOLDERS);
  const [ grabFolder, setGrabFolder ] = useState(null);

  // buildTree 메서드 테스트
  // useEffect(() => {
  //   const initialTree = (folderList) => {
  //     console.log(buildTree(0, []));
  //   };

  //   initialTree(folderList);
  // }, [folderList]);

  const handleDragOver = (e) => {
    dragOver(e);
  };

  const handleDragStart = (e) => {
    dragStart(e);
    setGrabFolder(e.target);
  };

  const handleDragEnd = (e) => {
    dragEnd(e);
  };

  const handleDrop = (e) => {
    const grabLocation = grabFolder.dataset.parent;
    const targetLocation = e.target.dataset.id;

    if (targetLocation !== grabLocation) {
      const modifiedList = drop(e.target, folderList, grabFolder);
      setFolderList(modifiedList);
    }
  }

  return (
    <DndWrap>
      <div className="container">
        <div className="data-box">
          <ul>
            root
          {FOLDERS.map((folder, index) => {
            if (folder.parent_folder === undefined) {
              return null;
            }

            return (
              <li
                key={index}
                className="folder"
                data-id={folder.id}
                data-parent={folder.parent_folder}
                draggable
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
              >
                {folder.title}
              </li>
            );
          })}
          </ul>
        </div>
        <div className="data-box">
        <ul>
          search history
          {FOLDERS.map((folder, index) => {
            if (folder.parent_folder === undefined) {
              return null;
            }

            return (
              <li
              key={index}
                className="folder"
                data-id={folder.id}
                data-parent={folder.parent_folder}
                draggable
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
              >
                {folder.title}
                <li></li>
              </li>
            );
          })}
          </ul>
        </div>
      </div>
    </DndWrap>
  );
}

export default Dnd;

const DndWrap = styled.div`
  .container {
    display: flex;
    width: 100%;
    margin: 10px 10px;
  }

  .data-box {
    display: flex;
    width: 100%;
    background-color: rgb(235, 223, 207);
    max-width: 700px;
    height: 100vh;
    overflow: hidden;
    margin: 0 auto;
    padding: 15px;
  }

  .data-box .folder {
    padding: 5px 25px;
    margin-top: 10px;
    background-color: #cccccc;
    cursor: grab;
  }

  .drag-target {
    background-color: blue;
    opacity: 0.4;
    cursor: grabbing;
  }
`;
