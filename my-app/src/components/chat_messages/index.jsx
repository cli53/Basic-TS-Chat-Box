import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { map, isEmpty } from "lodash";
import { interleavingMessages } from "./utils";
import LoadingIndicator from "../chat_loading";

// TODO: implement scroll to bottom functionality
// TODO: implement rendering emojis
// bubble, text, avatar, details, displayName

const DisplayName = styled.header`
  font-weight: 600;
`;

const TimeDetails = styled.p`
  font-size: 0.5rem;
  color: lightgrey;
`;

const ChatBubble = styled.div`
  height: fit-content;
  width: fit-content;
  padding: 5px;
  border-radius: 2%;
  background-color: lightblue;
  color: black;
`;

const Avatar = styled.div`
  border-radius: 50%;
  height: 75px;
  width: 75px;
`;

const ChatRow = styled.section`
  display: flex;
`;

const ChatMessages = ({ messages = [], isLoading, user: loginUser = {} }) => {
  if (isLoading) return <LoadingIndicator />;

  if (!isLoading && !isEmpty(messages)) {
    const formattedMessages = interleavingMessages(messages);
    return map(formattedMessages, message => {
      let isUser = message.userId === loginUser.id;
      let renderName = message?.display_name;
      return (
        <ChatRow className={`chat-row`} key={message.id}>
          <Avatar alt="sender avatar" className="avatar">
            {message.avatar}
          </Avatar>
          <ChatBubble>
            <DisplayName>{renderName}</DisplayName>
            {message.text}
          </ChatBubble>
          <TimeDetails>{message.time}</TimeDetails>
        </ChatRow>
      );
    });
  } else {
    return <h1>messages</h1>;
  }
};

ChatMessages.propTypes = {
  messages: PropTypes.array,
  isLoading: PropTypes.bool,
  user: PropTypes.object
};

export default ChatMessages;
