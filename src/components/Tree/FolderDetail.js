import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import category from "../../utils/category.json";
import {
  changeFolderDetail,
  deleteBookmark,
  getFolderDetail,
  selectCategory,
} from "../../redux/slices/folderSlices";
import SelectBox from "../Category/SelectBox";
import TreeModal from "./TreeModal";
import Bookmark from "./Bookmark";

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  margin: 10px 10px;
  align-items: center;
  width: 95%;
  height: 90%;
  border-radius: 35px;

  .form {
    width: 90%;
    height: 90%;
  }

  .category {
    display: flex;
    flex-direction: row;
  }
  .edit {
    margin-left: 10px;
    border: 1px solid black;
    text-align: center;
    width: 130px;
  }
`;

const BookmarkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  overflow-y: scroll;
  border-radius: 15px;
`;

export default function FolderDetail({ target, isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const folderInfo = useSelector((state) => state.folder.targetFolder);
  const [mainCategoryIndex, setMainCategory] = useState(0);
  const [subCategoryIndex, setSubCategory] = useState(0);
  const [showCategorySelectBox, setShowCategorySelectBox] = useState(false);
  const [title, setTitle] = useState(folderInfo.title);

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
      const { main_category } = folderInfo;
      const { sub_category } = folderInfo;
      changedInfo = {
        target,
        title: title,
        main_category: main_category,
        sub_category: sub_category,
        bookmark: folderInfo.bookmark,
      };
    }
    dispatch(changeFolderDetail(changedInfo));
    setIsOpen(false);
  };

  return (
    <div>
      <TreeModal open={isOpen} onClose={() => setIsOpen(false)}>
        <DetailWrapper>
          <div className="form">
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="category">
              Category: {folderInfo.main_category} / {folderInfo.sub_category}
              <div
                className="edit"
                onClick={() =>
                  setShowCategorySelectBox((showCategorySelectBox) => !showCategorySelectBox)
                }
              >
                {showCategorySelectBox ? "cancel change" : "change"}
              </div>
            </div>
            {showCategorySelectBox && (
              <div>
                <SelectBox category={category.mainCategory} onSelectCategory={setMainCategory} />
                <SelectBox
                  category={category.mainCategory[mainCategoryIndex].subCategory}
                  onSelectCategory={setSubCategory}
                />
              </div>
            )}
            <div>북마크 리스트</div>
            <BookmarkWrapper>
              {folderInfo.bookmark.map((link, index) => {
                if (!folderInfo.bookmark) {
                  return;
                }

                return <Bookmark bookmark={link} index={index} />;
              })}
            </BookmarkWrapper>
          </div>
          <button type="button" onClick={handleSaveButton}>
            저장하기
          </button>
        </DetailWrapper>
      </TreeModal>
    </div>
  );
}
