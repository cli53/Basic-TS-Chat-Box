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

// scroll smooth has on the element or be the parent
const ModalContainer = styled.section`
  scroll-behavior: smooth;
  index-z: 999;
  margin: 10% auto;
  background-color: ${({ theme }) => theme.bgc};
  overflow-y: scroll;
  height: 600px;
  width: 500px;
  border-radius: 3px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  padding: 1rem;
`;

type ModalProps = {
  children: React.ReactNode;
};
const Modal: React.FC<ModalProps> = ({ children }) => {
  const modalEle = (
    <ModalOverlay>
      <ModalContainer>{children}</ModalContainer>
    </ModalOverlay>
  );

  return usePortal(modalEle, "modal-root");
};

export default Modal;
