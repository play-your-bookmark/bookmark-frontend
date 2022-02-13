import React from "react";

export default function SelectBox({ boxTitle, category, onSelectCategory }) {
  const handleSelectChange = (e) => {
    onSelectCategory(e.target.selectedIndex);
  };

  return (
    <select onChange={handleSelectChange}>
      {category.map((option) => (
        <option key={option.name} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
