import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { selectCategory } from "../../redux/slices/folderSlices";
import Modal from "../Modal/Modal";
import SelectBox from "./SelectBox";
import category from "../../utils/category.json";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  align-items: center;
  width: 500px;

  select {
    text-align: center;
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0 5px;
    width: 100px;
    height: 40px;
    border-radius: 15px;
    border: 2px solid #f2c84d;
    :hover {
      background-color: #f2c84d;
    }
  }
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
        <div className="category">
          폴더의 카테고리를 지정해주세요!
          <ButtonWrapper>
            <SelectBox category={category.mainCategory} onSelectCategory={setMainCategory} />
            <SelectBox
              category={category.mainCategory[mainCategoryIndex].subCategory}
              onSelectCategory={setSubCategory}
            />
          </ButtonWrapper>
          <button className="finish" onClick={handleCloseButton}>
            설정 완료
          </button>
        </div>
      </Modal>
    </div>
  );
}
