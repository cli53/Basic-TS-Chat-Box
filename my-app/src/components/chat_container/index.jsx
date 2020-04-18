import React from "react";
import { useFetch } from "../../utils";
import PropTypes from "prop-types";
import ChatInput from "../chat_input";
import ChatMessages from "../chat_messages";

const ChatContainer = ({ user }) => {
  const url = "https://api.jsonbin.io/b/5e9a6b452940c704e1da618a";
  const { data: messages, isLoading } = useFetch(url);
  console.log("state", messages, isLoading);
  return (
    <div>
      <h1>Chat Container</h1>
      <ChatMessages messages={messages} isLoading={isLoading} user={user} />
      <ChatInput />
    </div>
  );
};

ChatContainer.propTypes = {
  user: PropTypes.string
};

export default ChatContainer;
