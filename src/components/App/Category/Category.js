/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../Modal/Modal";

const BUTTON_WRAPPER_STYLES = styled.button`
  position: relative;
  zIndex: 1;
`; 

const OTHER_CONTENT_STYLES = styled.div`
  position: relative;
  zIndex: 2;
  background-color: red;
  padding: 10px;
`;

export default function Category() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BUTTON_WRAPPER_STYLES>
        <button onClick={() => setIsOpen(true)}>open modal</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Fancy Modal
        </Modal>
      </BUTTON_WRAPPER_STYLES>

      <OTHER_CONTENT_STYLES />
    </>
  );
}
