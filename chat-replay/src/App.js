import React from "react";
import { createGlobalStyle } from "styled-components";
import ChatContainer from "./components/chat_container";

const GlobalStyle = createGlobalStyle`
  html {
    text-align: center;
    scroll-behavior: smooth;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ChatContainer />
    </>
  );
}

export default App;
