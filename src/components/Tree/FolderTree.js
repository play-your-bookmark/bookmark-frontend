import React from "react";

export default function FolderTree({ subTree }) {
  return (
    <>
      <h1>{subTree[1]}</h1>
      {subTree.length >= 3 &&
        subTree.map((child, index) => {
          if (index < 3) {
            return;
          }

          return <FolderTree subTree={child} />;
        })}
    </>
  );
}
