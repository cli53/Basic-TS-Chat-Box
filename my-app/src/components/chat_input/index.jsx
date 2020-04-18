import React, { useState } from "react";

// TODO: disable submit button if there are not any messages
export const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleSubmitMessage = event => {
    event.preventDefault();
    alert("A name was submitted: " + message);
  };

  return (
    <form onSubmit={handleSubmitMessage}>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Say how YOU really feel..."
        autoComplete={"off"}
        name="message"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
