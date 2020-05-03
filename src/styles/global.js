import { createGlobalStyle } from "styled-components"


export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    text-align: center;
    background-color: ${({theme}) => theme.bgc};
    color: ${({theme}) => theme.color};
    font-family: Roboto, BlinkMacSystemFont, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
    button {
      background-color:${({theme}) => theme.accentBgc};
      color: ${({theme}) => theme.accentColor};
      border-radius: 11rem;
      height: 3rem;
      width: 9rem;
      font-size: inherit;
    }
  }
`;