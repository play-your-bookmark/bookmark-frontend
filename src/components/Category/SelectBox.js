import React from "react";

export default function SelectBox({ boxTitle, category, onSelectCategory }) {
  const handleSelectChange = (e) => {
    onSelectCategory(e.target.selectedIndex - 1);
  };

  return (
    <select defaultValue="default" onChange={handleSelectChange}>
      <option value="default" disabled>
        {boxTitle}
      </option>
      {category.map((option) => (
        <option key={option.name} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
