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
  margin-bottom: 0.3rem;
`;

const TimeDetails = styled.p`
  font-size: 0.5rem;
  color: lightgrey;
  padding: 0 0.5rem;
`;

const ChatBubble = styled.div`
  height: fit-content;
  width: fit-content;
  padding: 0.5rem;
  border-radius: 2%;
  background-color: lightblue;
  color: #14171a;
`;

const Avatar = styled.div`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  font-weight: 700;
  font-size: 2rem;
  margin: 1rem 1rem;
  background-color: aquamarine;
  color: #043623;
`;

const ChatRow = styled.section`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.isUser ? "row-reverse" : "row")};
`;

const ChatMessages = ({ messages = [], isLoading, user: loginUser = {} }) => {
  if (isLoading) return <LoadingIndicator />;

  if (!isLoading && !isEmpty(messages)) {
    const formattedMessages = interleavingMessages(messages);
    return map(formattedMessages, message => {
      const isUser = message.userId === loginUser.id;
      console.log(
        "loginUser.id",
        loginUser.id,
        "message.userId",
        message.userId,
        isUser
      );
      return (
        <ChatRow className={`chat-row`} key={message.id} isUser={isUser}>
          <Avatar alt="sender avatar" className="avatar">
            {message.avatar}
          </Avatar>
          <ChatBubble>
            <DisplayName>{message.display_name}</DisplayName>
            {message.text}
          </ChatBubble>
          <TimeDetails>{message.time}</TimeDetails>
        </ChatRow>
      );
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
