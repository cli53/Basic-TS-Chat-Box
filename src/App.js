// TODO: react axe and eslint

import React, { useState } from "react";
import ChatContainer from "./components/chat_container";
import Modal from "./components/modal";
import ModalButton from './components/modal_button'
import {GlobalStyle} from './global'
import styled, {ThemeProvider} from 'styled-components'
import {lightTheme, darkTheme} from './theme'

const ModalRoot = styled.div`
  position: relative;
  z-index: 999;
`;

function App() {
    const [theme, setTheme] = useState('light')
    const [isModalOpen, toggleModal] = useState(false);
  const toggleTheme = () => {
    if(theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <ModalRoot id="modal-root" />
      <div>
        <h1>Chat App</h1>
        <button onClick={() => toggleTheme()}>Toggle Theme</button>
        <ModalButton toggleModal={toggleModal}/>
        {isModalOpen ? (
          <Modal>
            <ChatContainer toggleModal={toggleModal} />
          </Modal>
        ) : null}
      </div>
    </ThemeProvider>
  );
}

export default App;
