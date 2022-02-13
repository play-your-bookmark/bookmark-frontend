import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import SelectBox from "./SelectBox";
import category from "../../utils/category.json";
import { selectCategory } from "../../redux/slices/folderSlices";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  align-items: center;
  width: 500px;
`;

export default function Category({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const [mainCategoryIndex, setMainCategory] = useState(0);
  const [subCategoryIndex, setSubCategory] = useState(0);

  const handleCloseButton = (e) => {
    const mainCategory = category.mainCategory[mainCategoryIndex].name;
    const subCategory = category.mainCategory[mainCategoryIndex].subCategory[subCategoryIndex].name;

    dispatch(selectCategory({ mainCategory, subCategory }));
    setIsOpen(false);
  };

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        폴더의 카테고리를 지정해주세요!
        <ButtonWrapper>
          <SelectBox category={category.mainCategory} onSelectCategory={setMainCategory} />
          <SelectBox
            category={category.mainCategory[mainCategoryIndex].subCategory}
            onSelectCategory={setSubCategory}
          />
        </ButtonWrapper>
        <button onClick={handleCloseButton}>설정 완료</button>
      </Modal>
    </div>
  );
}
