import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { handleLike, deleteUniqueCategoryFolder } from "../../redux/slices/categoryFolderSlices";
import req from "../../utils/api";

export default function LikeButton({ folder, index, origin, category }) {
  const dispatch = useDispatch();
  const isChecked = useSelector((state) => state.categoryFolder.checkedFolder);

  async function handleClickLikeFolder() {
    const { data } = await req("get", `/folder/unique/${folder._id}`, {}, (res) => res, true);

    if (data === "Folder Not Found") {
      alert("존재하지 않는 폴더입니다.");
      dispatch(deleteUniqueCategoryFolder({ category, index }));

      return;
    }

    dispatch(handleLike([folder["_id"], index, origin]));
  }

  return !isChecked[folder._id] ? (
    <HeartOutlined
      style={{ fontSize: "30px", margin: "5px" }}
      onClick={() => handleClickLikeFolder()}
    />
  ) : (
    <HeartFilled
      style={{ color: "red", fontSize: "30px", margin: "5px" }}
      onClick={() => handleClickLikeFolder()}
    />
  );
}
