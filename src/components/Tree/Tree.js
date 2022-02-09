/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Tree.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchCreatedFolder } from "../../redux/slices/folderSlices";
import { buildTree } from "../../utils/tree";
import FolderTree from "./FolderTree";
import LinkList from "../Link/LinkList";
// import CATEGORY from "../../utils/category.json";

export default function Tree() {
  const dispatch = useDispatch();
  const folderList = useSelector((state) => state.folder.folderList);
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

  return (
    <div className="container">
      <div className="data-box">
        <div className="folder-list">
          <ul>{tree && <FolderTree subTree={tree} />}</ul>
        </div>
      </div>
      <div className="history-box">
        <LinkList />
      </div>
    </div>
  );
}

// const DndWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   margin: 10px;

//   ul {
//     list-style: none;
//     margin: 0;
//     padding: 0;
//   }

//   li {
//     background-color: white;
//   }

//   .data-box,
//   .history-box {
//     display: flex;
//     width: 45%;
//     height: auto;
//     overflow: hidden;
//     margin: 0 auto;
//     padding: 15px;
//   }

//   .data-box {
//     background-color: #5587f5;
//   }

//   .history-box {
//     background-color: #f2c84d;
//   }

//   .drag-target {
//     background-color: blue;
//     cursor: grabbing;
//   }
// `;
