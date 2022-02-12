import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { handleLike } from "../../redux/slices/categoryFolderSlices";

export default function LikeButton({ folder, index, origin }) {
  const dispatch = useDispatch();
  const isChecked = useSelector((state) => state.categoryFolder.checkedFolder);

  function handleClickLikeFolder() {
    dispatch(handleLike([folder["_id"], index, origin]));
  }

  return !isChecked[folder._id] ? (
    <HeartOutlined
      style={{ fontSize: "30px", margin: "5px" }}
      onClick={() => handleClickLikeFolder()}
    />
  ) : (
    <HeartFilled
      style={{ color: "orange", fontSize: "30px", margin: "5px" }}
      onClick={() => handleClickLikeFolder()}
    />
  );
}
