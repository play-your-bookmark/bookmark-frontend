import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteBookmark } from "../../redux/slices/folderSlices";
import Button from "./Button";

const BookmarkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  background-color: #ffffff;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
  border-radius: 5px;
  margin: 10px 10px;
  padding: 10px 10px;

  .delete {
    color: #5587f5;
  }
`;

export default function Bookmark({ bookmark, index }) {
  const dispatch = useDispatch();

  const handleDeleteButton = (e) => {
    dispatch(deleteBookmark(index));
  };

  return (
    <BookmarkWrapper>
      <a href={bookmark.url}>{bookmark.title || "제목 없음"}</a>
      <Button name="delete" type="button" onClickAction={handleDeleteButton} />
    </BookmarkWrapper>
  );
}
