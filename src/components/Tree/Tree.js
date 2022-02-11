/* eslint-disable react/no-children-prop */
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
    // 생성된 폴더가 없는 경우, fetch를 하면 [undefined] (boolean값 true)로 나옴. 즉 fetch 여부를 파악하기 위해 로직유지
    if (folderList) {
      const tree = buildTree(folderList, 0, []);
      setTree(tree);
    }
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
