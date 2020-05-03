// TODO: react axe and eslint

import React, { useState } from "react";
import ChatContainer from "./components/chat_container";
import Modal from "./components/modal";
import ModalButton from "./components/modal_button";
import { GlobalStyle } from "./styles/global";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import ThemeButton from "./components/theme_button";
import { useDarkMode } from "./hooks";

const ModalRoot = styled.div`
  position: relative;
  z-index: 999;
`;

// TODO:
// Implement Typescript
// Voice message,
// sign in form,
// attachment,
// change background
// delete - delete for the user and option for the other person
// Loading fonts

const AppHeader = styled.h1`
  color: ${({ theme }) => theme.softBlack};
`;

function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  const [isModalOpen, toggleModal] = useState(false);
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <ModalRoot id="modal-root" />
      <AppHeader>Chat App</AppHeader>
      <ThemeButton toggleTheme={toggleTheme} theme={theme} />
      <ModalButton toggleModal={toggleModal} />
      {isModalOpen ? (
        <Modal>
          <ChatContainer toggleModal={toggleModal} />
        </Modal>
      ) : null}
    </ThemeProvider>
  );
}

export default App;
