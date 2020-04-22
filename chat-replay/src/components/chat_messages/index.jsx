import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash";

const ChatMessages = ({ messages, isLoading, user: loginUser = {} }) => {
  if (!isLoading && messages) {
    return map(messages, (message, key) => {
      return <div key={key}>{message.delta}</div>;
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
