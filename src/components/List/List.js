/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Card from "./Card";
import Modal from "../Modal/Modal";
import LikeButton from "./LikeButton";
import { fetchCategoryFolder } from "../../redux/slices/categoryFolderSlices";
import UserPageButton from "./UserPageButton";
import { getUserOfSelectedFolder } from "../../redux/slices/userSlices";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.color};
  margin: 10px;
  z-index: 1;
  overflow: scroll;
  border: 3px solid skyblue;
`;

const FolderTitleWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  margin: 10px;
  background: white;
  font-size: 20px;
  width: 400px;
  border: 2px solid black;
`;

const Hyperlink = styled.a`
  :link {
    color: black;
    text-decoration: none;
  }
  :visited {
    color: black;
    text-decoration: none;
  }
  :hover {
    font-weight: bolder;
    color: black;
  }
`;

const LinkContainer = styled.div`
  margin: 10px;
`;

const LikeWrapper = styled.div`
  margin-top: 7px;
  font-size: 20px;
  font-weight: bolder;
`;

const ModalTitle = styled.div`
  font-size: 20px;
`

export default function List({
  category,
  origin,
  userCreatedFolders = [],
  userLikedFolders = [],
  width = 450,
  height = 200,
  color,
}) {
  const dispatch = useDispatch();
  const selectedFolder = useSelector((state) => state.folder.selectedFolder);
  const selectedUserName = useSelector((state) => state.user.selectedUserName);
  const fetchedCategoryFolder = useSelector((state) => state.categoryFolder.fetchedCategoryFolder);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategoryFolder({ origin, category }));
  }, [dispatch, origin, category]);

  if (selectedFolder) {
    dispatch(getUserOfSelectedFolder(selectedFolder.publisher));
  }

  return (
    <CardWrapper style={{ width: width, height: height }} color={color}>
      {!!userLikedFolders.length &&
        userLikedFolders.map((folder, index) => {
          return (
            <Card
              key={folder._id}
              folder={folder}
              origin={origin}
              setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
            />
          );
        })}
      {!!userCreatedFolders.length &&
        userCreatedFolders.map((folder, index) => {
          return (
            <Card
              key={folder._id}
              folder={folder}
              origin={origin}
              setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
            />
          );
        })}
      {category &&
        fetchedCategoryFolder[category] &&
        fetchedCategoryFolder[category].map((folder, index) => {
          if (!folder) return;

          return (
            <FolderTitleWrapper key={folder._id}>
              <Card
                folder={folder}
                origin={origin}
                setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
              />
              <LikeButton folder={folder} index={index} origin={origin} category={category} />
              <LikeWrapper>{folder.likes.length}</LikeWrapper>
            </FolderTitleWrapper>
          );
        })}
      {selectedFolder && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <UserPageButton
            onClick={() => setIsModalOpen(false)}
            userName={selectedUserName}
            userObjectId={selectedFolder.publisher}
          />
          <ModalTitle>📕 링크 모음</ModalTitle>
          {selectedFolder.bookmark.map((link) => (
            <LinkWrapper key={link.url}>
              <Hyperlink href={link.url}>
                {link.title.length > process.env.REACT_APP_MAX_LINK_LENGTH
                  ? `${link.title.substring(0, process.env.REACT_APP_MAX_LINK_LENGTH - 3)}...`
                  : (link.title.length === 0 ? "(TITLE UNDEFINED)" : link.title)}
              </Hyperlink>
            </LinkWrapper>
          ))}
        </Modal>
      )}
      {!category && selectedFolder && (
        <LinkContainer>
          {selectedFolder.bookmark.map((link) => (
            <LinkWrapper key={link.url} >
              <Hyperlink href={link.url}>
                {link.title.length > process.env.REACT_APP_MAX_LINK_LENGTH
                  ? `${link.title.substring(0, process.env.REACT_APP_MAX_LINK_LENGTH - 3)}...`
                  : (link.title.length === 0 ? "(TITLE UNDEFINED)" : link.title)}
              </Hyperlink>
            </LinkWrapper>
          ))}
        </LinkContainer>
      )}
    </CardWrapper>
  );
}
