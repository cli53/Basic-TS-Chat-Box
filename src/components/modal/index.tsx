import React from "react";
import styled from "styled-components";
import { usePortal } from "../../hooks";
import LoadingIndicator from "../chat_loading";

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

const CloseButton = styled.button`
  position: fixed;
  height: 2rem;
  width: 2rem;
  margin-left: 13.5rem;
`;

type ModalProps = {
  children: React.ReactNode;
  toggleModal: (bool: boolean) => void;
  isLoading: boolean;
};
const Modal: React.FC<ModalProps> = ({ children, toggleModal, isLoading }) => {
  const modalEle = (
    <ModalOverlay>
      <ModalContainer>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <CloseButton onClick={() => toggleModal(false)}>X</CloseButton>
            {children}
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );

  return usePortal(modalEle, "modal-root");
};

export default Modal;
