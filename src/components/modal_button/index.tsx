import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  height: 3rem;
  width: 9rem;
  font-size: 1rem;
  border: none;
  &::after {
    content: " 🧐";
  }
`;

type ModalButtonProps = {
  theme: string;
  toggleModal: (bool: boolean) => void;
};

const ModalButton: React.FC<ModalButtonProps> = ({ toggleModal }) => (
  <Button onClick={() => toggleModal(true)}>show chat</Button>
);

export default ModalButton;
