import React from "react";
import logo from "../../logo.svg";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
`;

const LoadingImg = styled.img`
  animation: ${rotate} infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
`;
const LoadingIndicator = () => {
  return <LoadingImg src={logo} alt="logo" />;
};

export default LoadingIndicator;
