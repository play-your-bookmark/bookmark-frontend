import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { dragOver, dragStart, dragEnd, drop } from "../../utils/dnd";
import { buildTree } from "../../utils/tree";
import { fetchCreatedFolder, moveFolder } from "../../redux/slices/folderSlices";

function Dnd() {
  const dispatch = useDispatch();
  const folderList = useSelector((state) => state.folder.folderList);
  const [grabFolder, setGrabFolder] = useState(null);

  useEffect(() => {
    dispatch(fetchCreatedFolder());
  }, [dispatch]);

  useEffect(() => {
    console.log("변경");
    console.log(folderList);
  }, [folderList]);

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
    const { target } = e;
    const grabLocation = grabFolder.dataset.parent;
    const targetLocation = target.dataset.id;

    if (targetLocation !== grabLocation) {
      const grabFolderIndex = drop(target, folderList, grabFolder);
      dispatch(moveFolder({ targetLocation, grabFolderIndex }));
    }
  };

  return (
    <DndWrap>
      <div className="container">
        <div className="data-box">
          <ul>
            root
            {folderList &&
              Object.values(folderList).map((folder) => {
                if (folder.parent_folder === undefined) {
                  return null;
                }

                return (
                  <div>
                    <li
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
                  </div>
                );
              })}
          </ul>
        </div>
        <div className="data-box">
          <ul>
            search history
            {folderList &&
              Object.values(folderList).map((folder) => {
                if (folder.parent_folder === undefined) {
                  return null;
                }

                return (
                  <div>
                    <li
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
                  </div>
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
    cursor: grabbing;
  }
`;
