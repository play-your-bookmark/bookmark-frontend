/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { dragOver, dragStart, dragEnd, drop } from "../../utils/dnd";
import { fetchCreatedFolder, moveFolder } from "../../redux/slices/folderSlices";
import { buildTree } from "../../utils/tree";
import FolderTree from "./FolderTree";
// import CATEGORY from "../../utils/category.json";

export default function Tree() {
  const dispatch = useDispatch();
  const folderList = useSelector((state) => state.folder.folderList);
  const [grabFolder, setGrabFolder] = useState(null);
  const [tree, setTree] = useState(null);

  useEffect(() => {
    dispatch(fetchCreatedFolder());
  }, [dispatch]);

  useEffect(() => {
    if (folderList) {
      const tree = buildTree(folderList, 0, []);
      setTree(tree);
    }
  }, [folderList]);

  // useEffect(() => {
  //   console.log("변경", folderList);
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
    const { target } = e;
    const grabLocation = grabFolder.dataset.parent;
    const targetLocation = target.dataset.id;

    if (targetLocation !== grabLocation) {
      const grabFolderIndex = drop(target, folderList, grabFolder);
      dispatch(moveFolder({ targetLocation, grabFolderIndex }));
    }
  };

  return (
    <DndWrapper>
      <div className="container">
        <div className="data-box">
          <ul>
            root
            {tree && <FolderTree subTree={tree} />}
            {/* {tree &&
              tree.map((branch, index) => {
                if (index < 3) {
                  return;
                }
                return (
                  <div>
                    <li
                      className="folder"
                      data-id={branch[0]}
                      // data-parent={folder.parent_folder}
                      draggable
                      onDragOver={handleDragOver}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDrop={handleDrop}
                    >
                      {branch[1]}
                    </li>
                  </div>
                );
              })} */}
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
    </DndWrapper>
  );
}

const DndWrapper = styled.div`
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
