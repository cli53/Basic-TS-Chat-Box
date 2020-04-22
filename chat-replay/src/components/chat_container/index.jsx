import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFetch } from "../../hooks";
import ChatMessages from "../chat_messages";
import LoadingIndicator from "../chat_loading";

const ChatTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const ChatContainer = ({ user }) => {
  const url = "https://api.jsonbin.io/b/5e9a6b452940c704e1da618a";
  const { data: messages, isLoading } = useFetch(url);
  console.log("messages", messages);
  if (isLoading) return <LoadingIndicator />;
  return (
    <>
      <ChatTitle>Stuck at Home Group Chat</ChatTitle>
      <ChatMessages messages={messages} isLoading={isLoading} user={user} />
    </>
  );
};

ChatContainer.propTypes = {
  user: PropTypes.object
};

export default ChatContainer;
