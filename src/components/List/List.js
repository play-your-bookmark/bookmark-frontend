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
  background-color: #5587f5;
  margin: 10px;
  z-index: 1;
`;

const FolderTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LinkWrapper = styled.div`
  display: flex;
  margin: 5px;
  background: white;
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

export default function List({
  category,
  origin,
  userCreatedFolders = [],
  userLikedFolders = [],
  width = 450,
  height = 200,
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
    <CardWrapper style={{ width: width, height: height }}>
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
              <div>{folder.likes.length}</div>
              <LikeButton folder={folder} index={index} origin={origin} category={category} />
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
          {selectedFolder.bookmark.map((link) => (
            <LinkWrapper key={link.url}>
              <Hyperlink href={link.url}>
                {link.title.length > process.env.REACT_APP_MAX_LINK_LENGTH
                  ? `${link.title.substring(0, process.env.REACT_APP_MAX_LINK_LENGTH - 3)}...`
                  : link.title}
              </Hyperlink>
            </LinkWrapper>
          ))}
        </Modal>
      )}
      {!category &&
        selectedFolder &&
        selectedFolder.bookmark.map((link) => (
          <LinkWrapper key={link.url}>
            <Hyperlink href={link.url}>
              {link.title.length > process.env.REACT_APP_MAX_LINK_LENGTH
                ? `${link.title.substring(0, process.env.REACT_APP_MAX_LINK_LENGTH - 3)}...`
                : link.title}
            </Hyperlink>
          </LinkWrapper>
        ))}
    </CardWrapper>
  );
}
