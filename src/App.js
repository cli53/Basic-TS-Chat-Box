// TODO: react axe and eslint

import React, { useState } from "react";
import ChatContainer from "./components/chat_container";
import Modal from "./components/modal";
import ModalButton from "./components/modal_button";
import { GlobalStyle } from "./styles/global";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import ThemeButton from "./components/theme_button";
import { useDarkMode, useFetch } from "./hooks";

const ModalRoot = styled.div`
  position: relative;
  z-index: 999;
`;

// TODO:
// Implement Typescript
// fix up collection ts
// add ts to react components
// Loading fonts
// sign in form,
// delete - delete for the user and option for the other person
// attachment,
// Voice message,
// abilitychange background
// adding design icons: iconmonstr and undraw, pexels, and tinypng
// reduce to chatbox consumed by another app

const AppHeader = styled.h1`
  line-height: 1.6;
`;

function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  const [isModalOpen, toggleModal] = useState(false);
  const url = "https://api.jsonbin.io/b/5e9a6b452940c704e1da618a";
  const {
    state: { data: messages, isLoading },
    setState: setMessage
  } = useFetch(url);
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <ModalRoot id="modal-root" />
      <AppHeader>Chat App</AppHeader>
      <ThemeButton toggleTheme={toggleTheme} theme={theme} />
      <ModalButton toggleModal={toggleModal} />
      {isModalOpen ? (
        <Modal toggleModal={toggleModal} isLoading={isLoading}>
          <ChatContainer
            toggleModal={toggleModal}
            messages={messages}
            setMessage={setMessage}
          />
        </Modal>
      ) : null}
    </ThemeProvider>
  );
}

export default App;
