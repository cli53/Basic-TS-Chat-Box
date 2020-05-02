import { createGlobalStyle } from "styled-components";

export const colors = {
  imperialRed: '#e63946ff', // accent color
  honeyDew: '#f1faeeff', // light type color
  powderBlue: '#a8dadcff', // light contrast color
  steelBlue: '#457b9dff', // dark contrast color
  prussianBlue: '#1d3557ff', // dark type color
  white: '#fffff',
  darkGrey: '#444444'
  }
    

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    text-align: center;
    background-color: ${({theme}) => theme.bgc};
    color: ${({theme}) => theme.color};
    font-family:  Roboto, BlinkMacSystemFont, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
    button {
      background-color:${({theme}) => theme.accentBgc};
      color: ${({theme}) => theme.accentColor};
      border-radius: 11rem;
      height: 3rem;
      width: 9rem;
    }
  }
`;