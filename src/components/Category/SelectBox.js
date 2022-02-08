import React from "react";
import styled from "styled-components";

const boxWrapper = styled.select`
  width: 200px;
`;

export default function SelectBox({ boxTitle, category, onSelectCategory }) {
  const handleSelectChange = (e) => {
    onSelectCategory(e.target.selectedIndex - 1);
  };

  return (
    <select defaultValue="default" onChange={handleSelectChange}>
      <option value="default" disabled>
        {boxTitle}
      </option>
      {category.map((option, index) => (
        <option key={option.name} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
