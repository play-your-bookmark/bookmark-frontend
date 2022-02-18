import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60rem;
  height: 35rem;
  border-radius: 35px;
  transform: translate(-50%, -50%);
  background-color: #5587f5;
  z-index: 1000;
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

export default function TreeModal({ open, onClose, children }) {
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
