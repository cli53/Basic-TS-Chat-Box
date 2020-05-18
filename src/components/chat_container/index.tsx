import React, { useState } from "react";
import styled from "styled-components";
import ChatMessages from "../chat_messages/index";
import ChatInput from "../chat_input";
import UserSelect from "../user_select";
import { interleavingMessages, createMessage } from "../utils";
import { Messages } from "../../type";
const ChatTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${({ theme }) => theme.softBlack};
`;

const ScrollBottomButton = styled.button`
  display: inline-block;
  height: 3.5rem;
  width: fit-content;
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

type ChatContainerProps = {
  messages: Messages[];
  setMessage: React.Dispatch<
    React.SetStateAction<{
      data: Messages[];
      isLoading: boolean;
    }>
  >;
};

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  setMessage
}) => {
  const { formattedMessages, userIds: users } = interleavingMessages(messages);

  const [currentUser, setCurrentUser] = useState(users[0]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUser(event.target.value);
  };

  const scrollToBottom = () => {
    const chatInput = document.getElementById("chat-input");
    if (chatInput) {
      chatInput.scrollIntoView();
    }
  };

  const updateMessages = (text: string) => {
    const newMessage = createMessage(text, currentUser);
    setMessage(prev => ({
      ...prev,
      data: [...prev.data, newMessage]
    }));
  };
  return (
    <Container>
      <UserSelect
        users={users}
        handleChange={handleChange}
        currentUser={currentUser}
      />

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

export default ChatContainer;
