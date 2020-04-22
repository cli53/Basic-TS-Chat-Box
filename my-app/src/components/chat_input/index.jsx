import React, { useState } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
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
  background: palevioletred;
  color: white;
  border: 2px solid white;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  display: inline-block;
  border-radius: 3px;
`;

// TODO: disable submit button if there are not any messages
export const ChatInput = ({ updateMessages }) => {
  const [message, setMessage] = useState("");

  const handleSubmitMessage = event => {
    event.preventDefault();
    alert("A name was submitted: " + message);
  };

  return (
    <InputContainer onSubmit={handleSubmitMessage}>
      <Input
        type="text"
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
  updateMessages: PropTypes.func
};

export default ChatInput;
