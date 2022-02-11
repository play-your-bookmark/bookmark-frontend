import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import req from "../../utils/api";

import Card from "./Card";
import Modal from "../Modal/Modal";

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
  const MAX_LINK_LENGTH = 40;
  const selectedFolder = useSelector((state) => state.folder.selectedFolder);
  const [categoryFolder, setCategoryFolder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getCategoryFolder() {
      const result = await req(
        "get",
        "/folder/category",
        { params: [origin, category] },
        (res) => setCategoryFolder(res.data),
        true,
      );
    }

    getCategoryFolder();
  }, []);

  return (
    <CardWrapper>
      {category &&
        categoryFolder &&
        categoryFolder.map((folder) => {
          if (!folder) return;

          return (
            <FolderTitleWrapper key={folder._id}>
              <Card
                folder={folder}
                origin={origin}
                setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
              />
            </FolderTitleWrapper>
          );
        })}
      {selectedFolder && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {selectedFolder.bookmark.map((link) => (
            <LinkWrapper key={link.url}>
              <Hyperlink href={link.url}>
                {link.title.length > MAX_LINK_LENGTH
                  ? `${link.title.substring(0, MAX_LINK_LENGTH - 3)}...`
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
              {link.title.length > MAX_LINK_LENGTH
                ? `${link.title.substring(0, MAX_LINK_LENGTH - 3)}...`
                : link.title}
            </Hyperlink>
          </LinkWrapper>
        ))}
    </CardWrapper>
  );
}
