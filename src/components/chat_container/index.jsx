import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFetch } from "../../hooks";
import { toNumber } from "lodash";
import ChatMessages from "../chat_messages";
import ChatInput from "../chat_input";
import LoadingIndicator from "../chat_loading";
import UserSelect from "../user_select";
import { interleavingMessages, createMessage } from "../chat_messages/utils";

const ChatTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const ScrollBottomButton = styled.button`
  display: inline-block;
  height: 1.5rem;
  width: fit-content;
  background-color: lightblue;
  color: black;
  border: none;
  border-radius: 2px;
  &::after {
    content: " ⬇️";
  }
`;


const Container = styled.div`
  width: inherit;
  height: inherit;
`;
const ChatContainer = ({ toggleModal }) => {
  const url = "https://api.jsonbin.io/b/5e9a6b452940c704e1da618a";
  const {
    state: { data: messages, isLoading },
    setState: setMessage
  } = useFetch(url);

  const { formattedMessages, userIds: users } = interleavingMessages(messages);

  const [currentUser, setCurrentUser] = useState(users[0]);

  const handleChange = event => {
    setCurrentUser(toNumber(event.target.value));
  };

  const scrollToBottom = () => {
    const chatInput = document.getElementById("chat-input");
    chatInput.scrollIntoView();
  };

  const updateMessages = value => {
    const newMessage = createMessage(value, currentUser);
    setMessage(prev => ({
      ...prev,
      data: [...prev.data, newMessage]
    }));
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <Container>
      <UserSelect
        users={users}
        handleChange={handleChange}
        currentUser={currentUser}
      />
      <button onClick={() => toggleModal(false)}>
        Close
      </button>
      <ChatTitle>Stuck at Home Group Chat</ChatTitle>
      <ScrollBottomButton onClick={scrollToBottom}>
        Click to Scroll Bottom
      </ScrollBottomButton>
      <ChatMessages messages={formattedMessages} currentUser={currentUser} />
      <ChatInput
        updateMessages={updateMessages}
        scrollToBottom={scrollToBottom}
      />
    </Container>
  );
};

ChatContainer.propTypes = {
  user: PropTypes.object,
  toggleModal: PropTypes.func
};

export default ChatContainer;
