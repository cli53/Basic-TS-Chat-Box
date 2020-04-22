import React from "react";
import styled, { keyframes } from "styled-components";
import logo from "../../logo.svg";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  height: 40vmin;
  font-size: 1.2rem;
`;

const LoadingIndicator = () => {
  return <img src={logo} className="App-logo" alt="logo" />;
};

export default LoadingIndicator;
