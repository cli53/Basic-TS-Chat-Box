import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: white;
  background: #5f293b;
  border: none;
  border-radius: 3px;
  width: 100%;
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

export const ChatInput = ({ updateMessages }) => {
  const [message, setMessage] = useState("");

  const scrollToBottom = () => {
    const chatInput = document.getElementById("chat-input");
    chatInput.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const handleSubmitMessage = event => {
    event.preventDefault();
    if (message) {
      updateMessages(message);
    }
    setMessage("");
  };

  return (
    <InputContainer onSubmit={handleSubmitMessage}>
      <Input
        type="text"
        id="chat-input"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type Something..."
        autoComplete={"off"}
        name="message"
      />
      <Button type="submit">Send</Button>
    </InputContainer>
  );
};

ChatInput.propTypes = {
  updateMessages: PropTypes.func,
  user: PropTypes.object
};

export default ChatInput;
