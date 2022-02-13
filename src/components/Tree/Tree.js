import React, { useEffect, useState } from "react";
import "./Tree.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchCreatedFolder, saveFolders } from "../../redux/slices/folderSlices";
import { buildTree } from "../../utils/tree";
import FolderTree from "./FolderTree";
import LinkList from "../Link/LinkList";

export default function Tree() {
  const dispatch = useDispatch();
  const folderList = useSelector((state) => state.folder.folderList);
  const [tree, setTree] = useState(null);

  useEffect(() => {
    dispatch(fetchCreatedFolder());
  }, [dispatch]);

  useEffect(() => {
    const tree = buildTree(folderList, 0, []);
    setTree(tree);
  }, [folderList]);

  const handleSaveButton = async () => {
    dispatch(saveFolders(folderList));
  };

  return (
    <>
      <div className="container">
        <div className="data-box">
          <div className="folder-list">
            <ul>{tree && <FolderTree subTree={tree} />}</ul>
          </div>
        </div>
        <div className="data-box">
          <div className="history-box">
            <LinkList />
          </div>
        </div>
      </div>
      <button type="button" onClick={handleSaveButton}>
        저장하기
      </button>
    </>
  );
}
