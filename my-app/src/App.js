import React from "react";
import "./App.css";
import ChatContainer from "./components/chat_container";

function App() {
  const user = {
    id: 1
  };
  return (
    <div className="App">
      <ChatContainer user={user} />
    </div>
  );
}

export default App;
