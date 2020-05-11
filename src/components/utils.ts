import { forEach, set, map, first, last, upperCase } from "lodash";
import {
  FormatMessages,
  Messages,
  ObjectLiteral,
  DeleteIds,
  MessageIds,
  MessageLists,
  UserIds
} from "../type";

const COLLECTION: ObjectLiteral = {
  deletedIds: {} as DeleteIds,
  messageIds: {} as MessageIds,
  messageList: {} as MessageLists,
  userIds: {
    1: {
      id: -1,
      user_name: "",
      display_name: ""
    }
  } as UserIds
};

const messageTypes = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  MESSAGE: "message",
  UPDATE: "update",
  DELETE: "delete"
};

const timeOptions = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true
};

/**
 * @description Returns a timestamp based on the delta
 * @param * {int} delta
 * @returns * {string} Returns the current time stamp with the difference in delta
 */
export const getTimeStamp = (delta: number): string => {
  const timeDiff = Date.now() - delta;
  const time = new Date(timeDiff).toLocaleString("en-US", timeOptions);
  return time;
};

/**
 * @description Hashes key value pairs to the collection
 * @param * {int} k
 * @param * {int} v
 * @param * {array} collection
 */
const storeId = (k: any, v: any, collection: any[]): void => {
  set(collection, k, v);
};

/**
 * @description Replaces text property of message object with text argument
 * @param * {int} indexOfMessage
 * @param * {string} text
 */
const replaceText = (indexOfMessage: number, text: string): void => {
  COLLECTION.messageList[indexOfMessage].payload.message.text = text;
};

/**
 * @description
 * - stores deleteId with timestamp incase we want to update the deleted message with the delete timestamp
 * - Gets the index of the message to be deleted from messageIds collection by passing the messageId of the delete message
 * - if removeMessage is true, the deleted message will be removed from the message list
 * - if removeMessage is false, the deleted message will have a text of "Message was deleted"
 * - the delete object will be removed from the message list as it has no message of it's own
 * @param * {object} obj
 * @param * {int} idx
 * @param * {boolean} removeMessage
 */
const performDeletes = (
  obj: Messages,
  idx: number,
  removeMessage = false
): void => {
  const messageId = obj.payload?.message?.id;

  storeId(idx, getTimeStamp(obj.delta), COLLECTION.deletedIds);
  let indexToDelete = COLLECTION.messageIds[messageId];

  if (removeMessage) {
    delete COLLECTION.messageList[indexToDelete];
  } else {
    replaceText(indexToDelete, "Message was deleted");
  }

  // delete type delete object
  delete COLLECTION.messageList[idx];
};

/**
 * @description
 * - if the update message has a messageId, find the message to be updated from the messageId collection, replace text and delete update message from messageList
 * - else set text of update message to the new changes in user object such as display_name
 * @param * {object} obj
 * @param * {int} idx
 */
const performUpdates = (obj: Messages, idx: number): void => {
  const messageId = obj.payload?.message?.id;

  if (messageId) {
    let indexToUpdate = COLLECTION.messageIds[messageId];
    replaceText(indexToUpdate, obj.payload.message.text);
    // updates timestamp for editted message
    COLLECTION.messageList[indexToUpdate].delta = obj.delta;
    // delete the update message marker
    delete COLLECTION.messageList[idx];
  } else {
    set(
      COLLECTION.messageList[idx],
      "payload.message.text",
      `Updating name to ${obj.payload.user.display_name}`
    );
  }
};

const getMessageWithFormatText = (
  type: string,
  renderedMessage: FormatMessages
): FormatMessages => {
  const formattedText = `${renderedMessage.display_name} has ${
    type === "connect" ? "joined" : "left"
  } the chat`;
  renderedMessage.text = formattedText;
  return renderedMessage;
};

const formatMessages = (filteredMessages: Messages[]): FormatMessages[] => {
  return map(
    filteredMessages,
    ({
      delta,
      payload: {
        type,
        user: { id: userId = 0, display_name },
        message: { id: messageId = -1, text } = {}
      }
    }: Messages): FormatMessages => {
      const time = getTimeStamp(delta);
      const firstLetterInitial = first(display_name);
      const lastLetterInitial = last(display_name);
      const initials = upperCase(`${firstLetterInitial}${lastLetterInitial}`);
      const renderedMessage = {
        display_name,
        messageId,
        text,
        time,
        userId,
        avatar: initials
      };
      const isConnect = type === messageTypes.CONNECT;
      const isDisconnect = type === messageTypes.DISCONNECT;
      return isConnect
        ? getMessageWithFormatText(messageTypes.CONNECT, renderedMessage)
        : isDisconnect
        ? getMessageWithFormatText(messageTypes.DISCONNECT, renderedMessage)
        : renderedMessage;
    }
  );
};

/**
 * @description
 * - stores messages in the collection
 * - if the message is not an update or delete object, store the messageIds
 * - perform deletes and updates based on the messageIds collection
 * @param * {array} messages
 * @returns Returns new messageList with delete and updates
 */

// object keys are coerced into strings, thus, object keys returns an array of strings
export const interleavingMessages = (
  messages: Messages[]
): { userIds: string[]; formattedMessages: FormatMessages[] } => {
  COLLECTION.messageList = { ...messages };
  forEach(messages, (obj, idx) => {
    const userId = obj?.payload?.user?.id;
    if (userId) {
      storeId(userId, obj?.payload?.user, COLLECTION.userIds);
    }

    const blackListedMessages =
      obj.payload.type !== messageTypes.DELETE &&
      obj.payload.type !== messageTypes.UPDATE;

    const messageId = obj.payload?.message?.id;
    if (messageId && blackListedMessages) {
      storeId(messageId, idx, COLLECTION.messageIds);
    } else if (obj.payload.type === messageTypes.DELETE) {
      performDeletes(obj, idx);
    } else if (obj.payload.type === messageTypes.UPDATE) {
      performUpdates(obj, idx);
    }
  });

  const interleavedMessages: Messages[] = Object.values(COLLECTION.messageList);
  return {
    userIds: Object.keys(COLLECTION.userIds),
    formattedMessages: formatMessages(interleavedMessages)
  };
};

export const createMessage = (value: string, currentUser: number): Messages => {
  const lastMessageId = last(Object.keys(COLLECTION.messageIds)) || -1;
  const userInfo = COLLECTION.userIds[currentUser];
  // if no messageId are found, create first message that starts at 0
  const newMessageId = +lastMessageId + 1;
  const newMessage = {
    delta: Date.now(),
    payload: {
      type: "message",
      user: {
        id: currentUser,
        user_name: userInfo.user_name,
        display_name: userInfo.display_name
      },
      message: {
        id: newMessageId,
        text: value
      }
    }
  };
  return newMessage;
};
