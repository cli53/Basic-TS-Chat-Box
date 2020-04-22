import React from "react";
import { first, last, capitalize } from "lodash";
import { render } from "@testing-library/react";
import mockData from "./mock.json";
import ChatMessages from "../src/components/chat_messages";

test("Renders empty message notification", () => {
  const { getByText, queryByText } = render(
    <ChatMessages messages={[]} user={{ id: 1 }} isLoading={true} />
  );
  const emptyMessage = "Nothing to see here...";
  expect(getByText(emptyMessage)).toBeInTheDocument();
  expect(queryByText("Something to see here")).not.toBeInTheDocument();
});

test("Renders initials for avatar", () => {
  const { getAllByText } = render(
    <ChatMessages messages={mockData} user={{ id: 1 }} isLoading={false} />
  );
  const avatarIntitals = capitalize(
    `${first(mockData[0].payload.user.display_name)}${last(
      mockData[0].payload.user.display_name
    )}`
  );

  expect(first(getAllByText(avatarIntitals))).toBeInTheDocument();
});

test("Renders chat bubble with message", () => {
  const { getByText } = render(
    <ChatMessages messages={mockData} user={{ id: 1 }} isLoading={false} />
  );
  const firstChatBubbleMessage = mockData[0].payload.message.text;
  expect(getByText(firstChatBubbleMessage)).toBeInTheDocument();
});
