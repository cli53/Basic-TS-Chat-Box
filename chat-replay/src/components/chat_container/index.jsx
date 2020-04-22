import React from "react";
import styled from "styled-components";
import { useFetch } from "../../hooks";
import PropTypes from "prop-types";

const ChatTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const ChatContainer = ({ user }) => {
  const url = "https://api.jsonbin.io/b/5e9a6b452940c704e1da618a";
  const { data, isLoading } = useFetch(url);
  console.log("messages", data);
  if (isLoading) return "LOADING";
  return (
    <>
      <ChatTitle>Stuck at Home Group Chat</ChatTitle>
    </>
  );
};

ChatContainer.propTypes = {
  user: PropTypes.object
};

export default ChatContainer;
