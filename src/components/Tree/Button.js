import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  button {
    display: flex;
    border: none;
    margin-left: 10px;
    background-color: white;
  }
`;
export default function Button({ name, type, onClickAction }) {
  return (
    <ButtonWrapper>
      <button className={name} type={type} onClick={onClickAction}>
        {name}
      </button>
    </ButtonWrapper>
  );
}
