import React, { FC } from "react";
import styled from "styled-components";
import { map, isEmpty } from "lodash";
import { FormatMessages } from "../../type";

const DisplayName = styled.header<{ children?: string | Element }>`
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const TimeDetails = styled.p`
  font-size: 0.5rem;
  color: #504848;
  padding: 0 0.5rem;
`;

const ChatBubble = styled.div<{
  className?: string;
  children?: any[];
}>`
  height: fit-content;
  width: fit-content;
  max-width: 350px;
  padding: 0.5rem;
  border-radius: 2%;
  background-color: ${({ theme }) => theme.accentBgc};
  color: ${({ theme }) => theme.color};
`;

const Avatar = styled.div<{ alt?: string; className?: string }>`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  font-weight: 700;
  font-size: 2rem;
  margin: 1rem 1rem;
  background-color: aquamarine;
  color: #043623;
`;

const ChatRow = styled.section<{ isUser: boolean; children?: any[] }>`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.isUser ? "row-reverse" : "row")};
`;

type ChatMessagesProps = {
  /** messages for rendering out the chat*/
  messages: FormatMessages[];
  /** the user id to compare messages with */
  currentUser: number;
};

const ChatMessages: FC<ChatMessagesProps> = ({ messages, currentUser }) => {
  if (!isEmpty(messages)) {
    const chatRows = map(
      messages,
      ({ userId, avatar, display_name, text, time }, key) => {
        const isUser = userId === currentUser;
        return (
          <ChatRow className={`chat-row`} key={key} isUser={isUser}>
            <Avatar alt="sender avatar" className="avatar">
              {avatar}
            </Avatar>
            <ChatBubble>
              <DisplayName>{display_name}</DisplayName>
              {text}
            </ChatBubble>
            <TimeDetails>{time}</TimeDetails>
          </ChatRow>
        );
      }
    );
    return <>{chatRows}</>;
  } else {
    return <h1>Nothing to see here...</h1>;
  }
};

export default ChatMessages;
