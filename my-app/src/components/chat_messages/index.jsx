import React from "react";
import { map, isEmpty } from "lodash";
import PropTypes from "prop-types";
import LoadingIndicator from "../chat_loading";

// TODO: implement scroll to bottom functionality
const ChatMessages = ({ messages = [], isLoading, user: loginUser = {} }) => {
  if (isLoading) return <LoadingIndicator />;
  const messageTypes = {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    MESSAGE: "message",
    UPDATE: "update",
    DELETE: "delete"
  };
  if (!isLoading && !isEmpty(messages)) {
    const formattedMessages = map(
      messages,
   
      ({
        delta,
        payload: {
          type,
          user: { id: userId, user_name, display_name } = {},
          message: { id: messageId = 0, text } = {}
        }
      },
      key,
      messagesArr) => {
        if (type === messageTypes.MESSAGE || type === messageTypes.UPDATE) {
          return { time: delta, display_name, text, messageId, userId, key};
        } else if (type === messageTypes.CONNECT) {
          return {
            time: delta,
            display_name,
            text: `${display_name} has joined the chat`,
            userId
          };
        } else if (type === messageTypes.DISCONNECT) {
          return {
            time: delta,
            display_name,
            text: `${display_name} has left the chat`,
            userId,
          };
        } else if(type === messageTypes.DELETE) {
            const handleDelete(message)
            // messagesArr.filter();
        }
      }
    );
    return map(formattedMessages, message => {
      console.log("message", message);
      let isUser =
        !isEmpty(message) &&
        message.userId === !isEmpty(message) &&
        loginUser.id;
      let renderName = message.display_name;
      return (
        <div
          key={message.id}
          className="chat-bubble-row"
          style={{ flexDirection: isUser ? "row-reverse" : "row" }}
        >
          {/* <img
            src={message.sender.avatar}
            alt="sender avatar"
            className="avatar"
            style={isUser ? { marginLeft: "15px" } : { marginRight: "15px" }}
          /> */}
          <div className={`chat-bubble`} key={message.id}>
            {renderName}
            <div
              className="message"
              style={{ color: isUser ? "#FFF" : "#2D313F" }}
            >
              {message.text}
            </div>
          </div>
        </div>
      );
    });
  } else {
    return <h1>messages</h1>;
  }
};
ChatMessages.propTypes = {
  messages: PropTypes.array,
  isLoading: PropTypes.bool,
  user: PropTypes.number
};

export default ChatMessages;
