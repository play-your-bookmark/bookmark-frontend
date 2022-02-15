import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchCreatedFolder, saveFolders } from "../../redux/slices/folderSlices";
import { buildTree } from "../../utils/tree";
import FolderTree from "./FolderTree";
import LinkList from "../Link/LinkList";

const TreeWrapper = styled.div`
  .container {
    display: flex;
    width: 100%;
    margin: 10px;
  }

  ul {
    list-style: none;
    border-radius: 25px;
    margin: 0;
    width: 100%;
    /* scroll 관련 */
    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 15px;
      background-color: #f2c84d;
    }

    ::-webkit-scrollbar-track {
      border-radius: 15px;
      height: 80%;
      background-color: white;
    }
  }

  li {
    list-style: none;
    border-radius: 15px;
    padding: 10px;
  }

  .data-box {
    display: flex;
    justify-content: center;
    border-radius: 15px;
    width: 40%;
    margin: 0 auto;
    padding: 15px;
    max-height: 700px;
    border-radius: 25px;
    background-color: #ebebeb;
  }

  .history-box {
    border-radius: 15px;
    justify-content: space-between;
    background-color: #f2c84d;
    /* scroll */
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

  .folder-list {
    display: flex;
    border-radius: 15px;
    justify-content: center;
    background-color: #5587f5;
    width: 80%;
  }

  .folder {
    color: white;
    display: flex;
    justify-content: left;
    align-items: center;
    // width: 20rem;
    // height: 2.5rem;
    margin: 1rem;
    // padding: 1rem;
    border-radius: 10px;
    //background-color: #ffffff;
  }

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
      <div className="container">
        <div className="data-box">
          <div className="folder-list">
            <ul>
              <li>{tree && <FolderTree subTree={tree} />}</li>
            </ul>
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
    </TreeWrapper>
  );
}
