import React, { useState } from "react";
import styled from "styled-components";

import Modal from "../Modal/Modal";
import SelectBox from "./SelectBox";

import category from "../../utils/category.json";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  align-items: center;
  width: 500px;
`;

export default function Category() {
  const [isOpen, setIsOpen] = useState(false);
  const [mainCategoryIndex, setMainCategory] = useState(0);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>open modal</button>

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
          />
        </ButtonWrapper>
        <button>카테고리 설정완료</button>
      </Modal>
    </div>
  );
}
