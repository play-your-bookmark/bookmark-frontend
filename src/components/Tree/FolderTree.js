import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { moveFolder } from "../../redux/slices/folderSlices";
import { dragEnd, dragOver, dragStart, drop } from "../../utils/dnd";

export default function FolderTree({ subTree }) {
  const dispatch = useDispatch();
  const [grabFolder, setGrabFolder] = useState("");
  // const [isToggled, setIsToggled] = useState(false);

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
    const grabFolderId = grabFolder.dataset.id;
    const targetLocationId = e.target.dataset.id;

    if (targetLocationId !== grabFolderId) {
      // drop 메서드는 현재 쓰이지 않음
      // 검색결과에서 가져오기 위해 추후 사용 예정
      // drop(e, grabFolder);
      dispatch(moveFolder({ targetLocationId, grabFolderId }));
    }
  };

  return (
    <li
      key={subTree[0]}
      data-id={subTree[0]}
      draggable
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      <div className="folder" data-id={subTree[0]}>
        - {subTree[1]}
      </div>
      {subTree.length >= 3 &&
        subTree.map((child, index) => {
          if (index < 3) {
            return;
          }

          return (
            <ul>
              <FolderTree subTree={child} />
            </ul>
          );
        })}
    </li>
  );
}
