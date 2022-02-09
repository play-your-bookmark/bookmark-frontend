import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { moveFolder, addFolder } from "../../redux/slices/folderSlices";
import { dragEnd, dragEnter, dragLeave, dragOver, dragStart, drop } from "../../utils/dnd";

export default function FolderTree({ subTree }) {
  const dispatch = useDispatch();
  const [grabFolder, setGrabFolder] = useState("");
  // const [isToggled, setIsToggled] = useState(false);

  const handleDragEnter = (e) => {
    dragEnter(e);
    e.target.classList.add("droppable");
  };

  const handleDragleave = (e) => {
    dragLeave(e);
    e.target.classList.remove("droppable");
  };

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
    e.target.classList.remove("droppable");
    const grabFolderId = grabFolder.dataset.id;
    const targetLocationId = e.target.dataset.id;

    if (targetLocationId !== grabFolderId) {
      // drop 메서드는 현재 쓰이지 않음
      // 검색결과에서 가져오기 위해 추후 사용 예정
      // drop(e, grabFolder);
      dispatch(moveFolder({ targetLocationId, grabFolderId }));
    }
  };

  const handleAddFolderButton = (e) => {
    // 폴더를 추가하고자 하는 장소
    // ( = 클릭한 버튼의 부모의 폴더 = 이 폴더의 아이디가 새폴더의 부모 아이디가 된다)
    // e.currentTarget

    // 부모 폴더의 아이디를 가져오기
    // e.currentTarget.dataset.id
    const targetLocation = e.currentTarget.dataset.id;

    // 새로 추가하고자 하는 폴더의 기초 정보 생성
    // 임시로 사용할 id는 `${category} ${newFolderCount} ${parentId}`
    // 겹치지 않게 하기 위해 Math.random() 사용함.
    // 카테고리 새폴더카운트(?) 부모아이디, 타이틀(무조건 새폴더), [북마크]
    // publisher는 추후 로그인한 유저의 정보를 넣어주는 방식
    const newFolderId = `react ${Math.random()} ${targetLocation}`;
    const newFolderName = "새폴더";
    const newFolder = {
      id: newFolderId,
      title: newFolderName,
      publisher: "",
      likes: 0,
      bookmark: [],
      parent_folder: targetLocation,
    };
    // reducers에 보내서 새로운 트리로 만들도록 유도
    // 보내야 할 정보: 새로운 폴더
    // console.log(subTree.map((child, index) => console.log(index, child)));
    dispatch(addFolder(newFolder));
  };

  return (
    <li>
      <div
        key={subTree[0]}
        data-id={subTree[0]}
        draggable
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragleave}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
      >
        <div className="folder" data-id={subTree[0]} onClick={handleAddFolderButton}>
          - {subTree[1]}
          <button type="button">click</button>
        </div>
        {subTree.length >= 3 &&
          subTree.map((child, index) => {
            if (index < 3) {
              return;
            }

            return <FolderTree subTree={child} />;
          })}
      </div>
    </li>
  );
}
