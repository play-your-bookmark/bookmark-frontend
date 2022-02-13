import React from "react";

export default function Button({ name, type, onClickAction }) {
  return (
    <button className={name} type={type} onClick={onClickAction}>
      {name}
    </button>
  );
}
