import React, { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: white;
  background: #5f293b;
  border: none;
  border-radius: 3px;
  width: 100%;
  font-size: 1rem;
`;

const InputContainer = styled.form`
  display: flex;
`;

const Button = styled.button`
  width: 11rem;
  float: right;
  background: #2196f3;
  color: white;
  border: 2px solid white;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  display: inline-block;
  border-radius: 3px;
`;

type ChatInputProps = {
  updateMessages: (message: string) => void;
  scrollToBottom: () => void;
};

export const ChatInput: React.FC<ChatInputProps> = ({
  updateMessages,
  scrollToBottom
}) => {
  const [message, setMessage] = useState("");

  // needs await because setStates are async and we want updated state before scroll
  const handleSubmitMessage = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (message) {
      await updateMessages(message);
      scrollToBottom();
    }
    setMessage("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <InputContainer onSubmit={handleSubmitMessage}>
      <Input
        type="text"
        id="chat-input"
        value={message}
        onChange={onChange}
        placeholder="Type Something..."
        autoComplete={"off"}
        name="message"
      />
      <Button type="submit">Send</Button>
    </InputContainer>
  );
};
export default ChatInput;
