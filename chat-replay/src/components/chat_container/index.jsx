import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFetch } from "../../hooks";
import { toNumber } from "lodash";
import ChatMessages from "../chat_messages";
import LoadingIndicator from "../chat_loading";
import UserSelect from "../user_select";
import { interleavingMessages } from "../chat_messages/utils";

const ChatTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const ChatContainer = () => {
  const url = "https://api.jsonbin.io/b/5e9a6b452940c704e1da618a";
  const { data: messages, isLoading } = useFetch(url);

  const { formattedMessages, userIds: users } = interleavingMessages(messages);

  const [currentUser, setCurrentUser] = useState(users[0]);

  const handleChange = event => {
    event.preventDefault();
    setCurrentUser(toNumber(event.target.value));
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      <UserSelect
        users={users}
        handleChange={handleChange}
        currentUser={currentUser}
      />
      <ChatTitle>Stuck at Home Group Chat</ChatTitle>
      <ChatMessages
        messages={formattedMessages}
        isLoading={isLoading}
        currentUser={currentUser}
      />
    </>
  );
};

ChatContainer.propTypes = {
  user: PropTypes.object
};

export default ChatContainer;
