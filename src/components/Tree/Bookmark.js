import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteBookmark } from "../../redux/slices/folderSlices";

const BookmarkWrapper = styled.div`
  border: 1px solid black;
  border-radius: 15px;
  margin: 10px 10px;
  padding: 10px 10px;
`;

export default function Bookmark({ bookmark, index }) {
  const dispatch = useDispatch();

  const handleDeleteButton = (e) => {
    dispatch(deleteBookmark(index));
  };

  return (
    <BookmarkWrapper>
      {bookmark.title}
      <button onClick={handleDeleteButton}>delete</button>
    </BookmarkWrapper>
  );
}
