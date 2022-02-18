/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchCategoryFolder } from "../../redux/slices/categoryFolderSlices";
import { getUserOfSelectedFolder } from "../../redux/slices/userSlices";
import Card from "./Card";
import Modal from "../Modal/Modal";
import LikeButton from "./LikeButton";
import UserPageButton from "./UserPageButton";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 10px;
  border-radius: 15px;
  align-items: center;
  background-color: ${(props) => props.color};
  box-shadow: 1px 1px 5px #000;
  margin: 10px;
  z-index: 1;
  overflow-y: scroll;
  overflow-x: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: #f2c84d;
  }

  ::-webkit-scrollbar-track {
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
  }
`;

const FolderTitleWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 50px;
  padding: 5px;
  margin-top: 30px;
  background: white;
  font-size: 20px;
  border-radius: 15px;
  box-shadow: rgba(26, 26, 26, 0.4) 0px 3px 2px 2px;

  :hover {
    box-shadow: rgba(26, 26, 26, 1) 0px 3px 2px 2px;
    font-weight: bold;
  }
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
`;

const LinkContainer = styled.div`
  margin: 10px;
`;

const LikeWrapper = styled.div`
  margin-top: 7px;
  font-size: 20px;
  font-weight: 500;
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
