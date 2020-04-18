import React from "react";
import { useFetch } from "../../utils";
import PropTypes from "prop-types";

const ChatContainer = props => {
  const url = "https://api.jsonbin.io/b/5e9a6b452940c704e1da618a";
  const { data, loading } = useFetch(url);
  console.log("state", data, loading);
  return (
    <div>
      <h1>Chat Container</h1>
    </div>
  );
};

ChatContainer.propTypes = {
  props: PropTypes.object
};

export default ChatContainer;
