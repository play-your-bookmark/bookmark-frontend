import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchCreatedFolder, saveFolders } from "../../redux/slices/folderSlices";
import { buildTree } from "../../utils/tree";
import FolderTree from "./FolderTree";
import LinkList from "../Link/LinkList";

const TreeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    height: 100px;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .container {
    display: inline-flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-content: space-around;
    align-items: center;
    width: 100%;
    height: 752px;
    /* 배경! #ffffff 으로 갈 계획! */
    background-color: gray;
  }

  .data-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #5587f5;
    width: 600px;
    height: 90%;
    border-radius: 15px;
  }

  .folder-list {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 93%;
    border-radius: 15px;
    background-color: #ffffff;
  }

  .history-box {
    display: flex;
    width: 90%;
    height: 93%;
    border-radius: 15px;
    background-color: #ffffff;
    overflow-y: scroll;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 15px;
      background-color: #5587f5;
    }

    ::-webkit-scrollbar-track {
      border-radius: 15px;
      height: 80%;
      background-color: white;
    }
  }
`;

export default function Tree() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const folderList = useSelector((state) => state.folder.folderList);
  const [tree, setTree] = useState(null);
  const SAVE_MESSAGE = "저장 하시겠습니까?";

  useEffect(() => {
    dispatch(fetchCreatedFolder());
  }, [dispatch]);

  useEffect(() => {
    const tree = buildTree(folderList, 0, []);
    setTree(tree);
  }, [folderList]);

  const handleSaveButton = async () => {
    if (window.confirm(SAVE_MESSAGE)) {
      dispatch(saveFolders(folderList));
      navigate("/app/rankpage");
    }
  };

  return (
    <TreeWrapper>
      <div className="title">
        <h1>Folders</h1>
        <h1>History</h1>
      </div>
      <div className="container">
        <div className="data-box">
          <div className="folder-list">{tree && <FolderTree subTree={tree} />}</div>
        </div>
        <div className="data-box">
          <div className="history-box">
            <LinkList />
          </div>
        </div>
        <button type="button" onClick={handleSaveButton}>
          저장하기
        </button>
      </div>
    </TreeWrapper>
  );
}
