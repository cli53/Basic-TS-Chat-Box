import React from "react";
import styled from "styled-components";
import { usePortal } from "../../hooks";

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

const ModalContainer = styled.section`
  scroll-behavior: smooth;
  index-z: 999;
  margin: 10% auto;
  background-color: white;
  overflow-y: scroll;
  height: 600px;
  width: 500px;
`;

const Modal = ({ children }) => {
  const modalEle = (
    <ModalOverlay>
      <ModalContainer>{children}</ModalContainer>
    </ModalOverlay>
  );

  return usePortal(modalEle, "modal-root");
};

export default Modal;
