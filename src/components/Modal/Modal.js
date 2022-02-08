/* eslint-disable prettier/prettier */
import React from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px;
  zIndex: 1000;
`;

const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  zIndex: 1000;
`;

export default function Modal({ open, children, onClose }) {
  if (!open) {
    return null;
  }

  return (
    <>
      <OverlayStyle />
      <ModalStyle>
        <button onClick={onClose}>close modal</button>
        {children}
      </ModalStyle>
    </>
  );
}
