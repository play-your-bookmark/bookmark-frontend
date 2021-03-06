import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchCreatedFolder, saveFolders } from "../../redux/slices/folderSlices";
import FolderTree from "./FolderTree";
import LinkList from "../Link/LinkList";
import logoBlue from "../../src_assets/logo_blue.png";
import logoYellow from "../../src_assets/logo_yellow.png";
import Button from "./Button";
import { buildTree } from "../../utils/tree";

const TreeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    height: 100px;
    position: relative;
    align-content: space-between;

    .title1 {
      position: absolute;
      left: 17%;

      .logo-blue {
        position: relative;
        right: 10%;
        top: 8px;
        width: 30px;
      }
    }

    .title2 {
      position: absolute;
      right: 28%;

      .logo-yellow {
        position: relative;
        width: 30px;
        right: 10%;
        top: 8px;
      }
    }
  }

  .container {
    display: inline-flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-content: space-around;
    width: 100%;
    height: 77.6vh;
    background-color: #ffffff;
  }

  .data-box1,
  .data-box2 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 1000px;
    height: 90%;
    border-radius: 20px;
  }

  .data-box1 {
    width: 600px;
    background-color: #ffffff;
  }

  .data-box2 {
    background-color: #f2c84d;
    box-shadow: 1px 1px 5px #000;
  }

  .outter-list {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    height: 100%;
    border-radius: 20px;
    background-color: #5587f5;
    box-shadow: 1px 1px 5px #000;
  }

  .folder-list {
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 93%;
    border-radius: 15px;
    background-color: #ffffff;
    overflow-y: scroll;
    overflow-x: auto;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
      background-color: #f2c84d;
    }

    ::-webkit-scrollbar-track {
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
      background-color: #ebebeb;
    }
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
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
      background-color: #5587f5;
    }

    ::-webkit-scrollbar-track {
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
      background-color: #ebebeb;
    }
  }

  .save {
    width: 100px;
    justify-content: center;
    font-size: 1.3rem;
    text-align: center;
    position: absolute;
    padding: 10px 10px;
    border-radius: 15px;
    right: 5.5%;
    top: 13%;
    cursor: pointer;

    :hover {
      background-color: #f2c84d;
      transition: 0.3s;
    }
  }
`;

export default function Tree() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const folderList = useSelector((state) => state.folder.folderList);
  const [tree, setTree] = useState(null);
  const SAVE_MESSAGE = "?????? ???????????????????";

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
        <h1 className="title1">
          <img className="logo-blue" src={logoBlue} alt="logo_blue" />
          Folders
        </h1>
        <h1 className="title2">
          <img className="logo-yellow" src={logoYellow} alt="logo_yellow" />
          History
        </h1>
      </div>
      <Button name="save" type="button" onClickAction={handleSaveButton} />
      <div className="container">
        <div className="data-box1">
          <div className="outter-list">
            <div className="folder-list">{tree && <FolderTree subTree={tree} />}</div>
          </div>
        </div>
        <div className="data-box2">
          <div className="history-box">
            <LinkList />
          </div>
        </div>
      </div>
    </TreeWrapper>
  );
}
