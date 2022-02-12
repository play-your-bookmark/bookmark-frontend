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
      {/* <button onClick={() => setIsOpen(true)}>open modal</button> */}
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        폴더 카테고리 설정
        <ButtonWrapper>
          <SelectBox
            boxTitle="대분류 선택"
            category={category.mainCategory}
            onSelectCategory={setMainCategory}
          />
          <SelectBox
            boxTitle="중분류 선택"
            category={category.mainCategory[mainCategoryIndex].subCategory}
            onSelectCategory={setSubCategory}
          />
        </ButtonWrapper>
        <button onClick={handleCloseButton}>카테고리 설정완료</button>
      </Modal>
    </div>
  );
}
