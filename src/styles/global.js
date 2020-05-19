import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  
  body {
    text-align: center;
    background-color: ${({ theme }) => theme.bgc};
    color: ${({ theme }) => theme.color};
    font-family: Roboto, BlinkMacSystemFont, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
    h1, label {
      color: ${({ theme }) => theme.headersColor}
    }
    button {
      background-color:${({ theme }) => theme.accentBgc};
      color: ${({ theme }) => theme.white};
      border-radius: 11rem;
      height: 3rem;
      width: 9rem;
      font-size: inherit;
    }


  }
`;
