import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import req from "../../utils/api";

import Card from "./Card";
import Modal from "../Modal/Modal";
import LikeButton from "./LikeButton";
import { fetchCategoryFolder } from "../../redux/slices/categoryFolderSlices";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: skyblue;
  margin: 10px;
  height: 500px;
  width: 450px;
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

export default function List({ category, origin }) {
  const dispatch = useDispatch();
  const selectedFolder = useSelector((state) => state.folder.selectedFolder);
  const fetchedCategoryFolder = useSelector((state) => state.categoryFolder.fetchedCategoryFolder);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategoryFolder({ origin, category }));
  }, []);

  useInterval(() => {
    dispatch(fetchCategoryFolder({ origin, category }));
    console.log(process.env.MAX_LINK_LENGTH);
  }, 5000);

  // process.env.RANK_PAGE_LOADING_DELAY

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function fetchToUpdateCategoryFolders() {
        savedCallback.current();
      }

      if (delay !== null) {
        const id = setInterval(fetchToUpdateCategoryFolders, delay);

        return () => clearInterval(id);
      }
    });
  }

  return (
    <CardWrapper>
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
          {selectedFolder.bookmark.map((link) => (
            <LinkWrapper key={link.url}>
              <Hyperlink href={link.url}>
                {link.title.length > process.env.MAX_LINK_LENGTH
                  ? `${link.title.substring(0, process.env.MAX_LINK_LENGTH - 3)}...`
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
              {link.title.length > process.env.MAX_LINK_LENGTH
                ? `${link.title.substring(0, process.env.MAX_LINK_LENGTH - 3)}...`
                : link.title}
            </Hyperlink>
          </LinkWrapper>
        ))}
    </CardWrapper>
  );
}
