import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import category from "../../utils/category.json";
import { changeFolderDetail, getFolderDetail } from "../../redux/slices/folderSlices";
import SelectBox from "../Category/SelectBox";
import TreeModal from "./TreeModal";
import Bookmark from "./Bookmark";
import Button from "./Button";

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  padding: 10px 10px;
  width: 92%;
  height: 88%;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 1px 1px 5px #000;

  .change {
    position: absolute;
    font-size: 1rem;
    color: #5587f5;
    background-color: #ffffff;
    top: 50px;
    right: 100px;
    cursor: pointer;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  input {
    width: 400px;
    height: 30px;
    font-size: 1.7rem;
    border: none;
    border-bottom: 3px solid #5587f5;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100px;

  .category {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.3rem;
    font-weight: 500;

    .edit-button {
      position: absolute;
      left: 330px;
      top: 135px;
      font-size: 1rem;
      color: #5587f5;
      cursor: pointer;
    }
  }

  .category-box {
    margin-top: 5px;
  }
`;

const BookmarkListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 350px;
  border-radius: 15px;

  .list {
    height: 90%;
    border: 3px solid #5587f5;
    border-radius: 10px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 7px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 15px;
      background-color: #5587f5;
    }

    ::-webkit-scrollbar-track {
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
      background-color: #ebebeb;
    }
  }
`;

export default function FolderDetail({ target, isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const folderInfo = useSelector((state) => state.folder.targetFolder);
  const [mainCategoryIndex, setMainCategory] = useState(0);
  const [subCategoryIndex, setSubCategory] = useState(0);
  const [showCategorySelectBox, setShowCategorySelectBox] = useState(false);
  const [title, setTitle] = useState(folderInfo.title);
  const SAVE_CHANGE_MESSAGE = "수정 하시겠습니까?";

  useEffect(() => {
    dispatch(getFolderDetail(target));
  }, [dispatch, target]);

  const handleSaveButton = () => {
    let changedInfo;

    if (showCategorySelectBox) {
      const main_category = category.mainCategory[mainCategoryIndex].name;
      const sub_category =
        category.mainCategory[mainCategoryIndex].subCategory[subCategoryIndex].name;
      changedInfo = {
        target,
        title: title,
        main_category: main_category,
        sub_category: sub_category,
        bookmark: folderInfo.bookmark,
      };
    } else {
      const { main_category, sub_category } = folderInfo;
      changedInfo = {
        target,
        title: title,
        main_category: main_category,
        sub_category: sub_category,
        bookmark: folderInfo.bookmark,
      };
    }

    if (window.confirm(SAVE_CHANGE_MESSAGE)) {
      dispatch(changeFolderDetail(changedInfo));
    }

    setIsOpen(false);
  };

  return (
    <div>
      <TreeModal open={isOpen} onClose={() => setIsOpen(false)}>
        <DetailWrapper>
          <Button name="change" type="button" onClickAction={handleSaveButton} />
          <TitleWrapper>
            Title
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </TitleWrapper>
          <CategoryWrapper>
            Category
            <div className="category">
              {folderInfo.main_category} / {folderInfo.sub_category}
              <div
                className="edit-button"
                onClick={() =>
                  setShowCategorySelectBox((showCategorySelectBox) => !showCategorySelectBox)
                }
              >
                {showCategorySelectBox ? "cancel" : "change category"}
              </div>
            </div>
            {showCategorySelectBox && (
              <div className="category-box">
                <SelectBox category={category.mainCategory} onSelectCategory={setMainCategory} />
                <SelectBox
                  category={category.mainCategory[mainCategoryIndex].subCategory}
                  onSelectCategory={setSubCategory}
                />
              </div>
            )}
          </CategoryWrapper>
          <BookmarkListWrapper>
            Bookmarks
            <div className="list">
              {folderInfo.bookmark.map((link, index) => {
                if (!folderInfo.bookmark) {
                  return;
                }

                return <Bookmark bookmark={link} index={index} />;
              })}
            </div>
          </BookmarkListWrapper>
        </DetailWrapper>
      </TreeModal>
    </div>
  );
}
