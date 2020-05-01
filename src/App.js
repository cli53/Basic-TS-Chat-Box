// TODO: react axe and eslint

import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ChatContainer from "./components/chat_container";
import Modal from "./components/modal";

const GlobalStyle = createGlobalStyle`
  html {
    text-align: center;
    scroll-behavior: smooth;
  }
`;

const ModalButton = styled.button`
  display: inline-block;
  height: 1.5rem;
  width: fit-content;
  background-color: lightblue;
  color: black;
  border: none;
  border-radius: 2px;
  &::after {
    content: "💫";
  }
`;

const ModalRoot = styled.div`
  position: relative;
  z-index: 999;
`;

function App() {
  const [isModalOpen, toggleModal] = useState(false);

  return (
    <>
      <GlobalStyle />
      <ModalRoot id="modal-root" />
      <div>
        <h1>Chat App</h1>
        <ModalButton onClick={() => toggleModal(true)} />
        {isModalOpen ? (
          <Modal>
            <ChatContainer toggleModal={toggleModal} />
          </Modal>
        ) : null}
      </div>
    </>
  );
}

export default App;
