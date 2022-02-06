import React, { useEffect, useState } from "react";
import "./Dnd.css";

import FOLDERS from "../../utils/folders.json";
import { dragOver, dragStart, dragEnd, drop } from "../../utils/dnd";
import { buildTree } from "../../utils/tree";

function Dnd() {
  const [ folderList, setFolderList ] = useState(FOLDERS);
  const [ grabFolder, setGrabFolder ] = useState(null);

  //buildTree 메서드 테스트
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
  );
}

export default Dnd;
