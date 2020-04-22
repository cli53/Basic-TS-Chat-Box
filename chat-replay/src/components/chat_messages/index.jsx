import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash";
import { interleavingMessages } from "./utils";

const ChatMessages = ({ messages, isLoading, user: loginUser = {} }) => {
  if (!isLoading && messages) {
    const formattedMessages = interleavingMessages(messages);
    console.log(formattedMessages);
    return map(formattedMessages, (message, idx) => {
      return <div key={idx}>{message.delta}</div>;
    });
  } else {
    return <h1>Nothing to see here...</h1>;
  }
};

ChatMessages.propTypes = {
  messages: PropTypes.array,
  isLoading: PropTypes.bool,
  user: PropTypes.object
};

export default ChatMessages;
