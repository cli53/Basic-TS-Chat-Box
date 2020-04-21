import React from "react";
import styled from "styled-components";
import { useFetch } from "../../hooks";
import PropTypes from "prop-types";
import ChatInput from "../chat_input";
import ChatMessages from "../chat_messages";

const ChatTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const ChatContainer = ({ user }) => {
  const url = "https://api.jsonbin.io/b/5e9a6b452940c704e1da618a";
  const { data: messages, isLoading } = useFetch(url);
  return (
    <div>
      <ChatTitle>Stuck at Home Group Chat</ChatTitle>
      <ChatMessages messages={messages} isLoading={isLoading} user={user} />
      <ChatInput />
    </div>
  );
};

ChatContainer.propTypes = {
  user: PropTypes.object
};

export default ChatContainer;
