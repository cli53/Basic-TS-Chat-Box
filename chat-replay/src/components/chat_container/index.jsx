import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFetch } from "../../hooks";
import { toNumber } from "lodash";
import ChatMessages from "../chat_messages";
import LoadingIndicator from "../chat_loading";
import UserSelect from "../user_select";

const ChatTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const ChatContainer = () => {
  const users = [1, 2, 3];
  const [currentUser, setCurrentUser] = useState(users[0]);

  const handleChange = event => {
    event.preventDefault();
    setCurrentUser(toNumber(event.target.value));
  };

  const url = "https://api.jsonbin.io/b/5e9a6b452940c704e1da618a";
  const { data: messages, isLoading } = useFetch(url);

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
        messages={messages}
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
