import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 40%;
  left: 50%;
  width: 50rem;
  height: 40rem;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  background-color: #f2c84d;
  z-index: 1000;

  .category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80%;
    padding: 20px 20px;
    border-radius: 15px;
    box-shadow: rgba(26, 26, 26, 0.4) 0px 3px 2px 2px;
    background-color: white;
  }

  .finish {
    width: 100px;
    height: 30px;
    margin-top: 30px;
    border: none;
    border-radius: 15px;
    background-color: white;
    cursor: pointer;

    :hover {
      background-color: #f2c84d;
    }
  }
`;

const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

export default function Modal({ open, onClose, children }) {
  if (!open) {
    return null;
  }

  const objectChildrenLength = Object.keys(children).length;

  return ReactDOM.createPortal(
    <>
      <OverlayStyle onClick={onClose} />
      <ModalStyle>
        {children.length > 0 || objectChildrenLength > 0 ? children : <div>빈 폴더입니다!</div>}
      </ModalStyle>
    </>,
    document.getElementById("modal"),
  );
}
