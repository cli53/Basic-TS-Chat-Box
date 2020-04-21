import React from "react";
import PropTypes from "prop-types";
import { map, filter, isEmpty } from "lodash";
import { getTimeStamp, interleavingMessages } from "./utils";
import LoadingIndicator from "../chat_loading";

// TODO: implement scroll to bottom functionality
// TODO: implement rendering emojis
// TODO: calculate time
// TODO: Deleted messages
// if they have the same message ID, remove the originally message
// filter out deleted messages
// store them in a  object
// loop the
// TODO: Updated messages

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
    const filteredMessages = interleavingMessages(messages);
    const formattedMessages = map(
      filteredMessages,
      (
        {
          delta,
          payload,
          payload: {
            type,
            user: { id: userId, user_name, display_name } = {},
            message: { id: messageId = 0, text } = {}
          }
        },
        key
      ) => {
        const time = getTimeStamp(delta);
        if (type === messageTypes.MESSAGE) {
          return { time, display_name, text, messageId, userId, key };
        } else if (type === messageTypes.CONNECT) {
          return {
            time,
            display_name,
            text: `${display_name} has joined the chat`,
            userId,
            key
          };
        } else if (type === messageTypes.DISCONNECT) {
          return {
            time,
            display_name,
            text: `${display_name} has left the chat`,
            userId,
            key
          };
        } else if (type === messageTypes.DELETE) {
          return { messageId, time, text: "deleted", key };
        } else if (type === messageTypes.UPDATE) {
          return { time, payload, key };
        }
      }
    );
    return map(formattedMessages, message => {
      let isUser =
        !isEmpty(message) &&
        message.userId === !isEmpty(message) &&
        loginUser.id;
      let renderName = message?.display_name;
      return (
        <div
          key={message.key}
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
            {renderName} {message?.time}
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
