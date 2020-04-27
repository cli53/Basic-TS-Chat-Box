import { forEach, set, map, first, last, upperCase } from "lodash";

const COLLECTION = {
  deletedIds: {},
  messageIds: {},
  messageList: {},
  userIds: { 1: null }
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
export const getTimeStamp = delta => {
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
const storeId = (k, v, collection) => {
  return set(collection, k, v);
};

/**
 * @description Replaces text property of message object with text argument
 * @param * {int} indexOfMessage
 * @param * {string} text
 */
const replaceText = (indexOfMessage, text) => {
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
const performDeletes = (obj, idx, removeMessage = false) => {
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
const performUpdates = (obj, idx) => {
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

const formatMessages = filteredMessages => {
  return map(
    filteredMessages,
    ({
      delta,
      payload: {
        type,
        user: { id: userId, display_name } = {},
        message: { id: messageId = null, text } = {}
      }
    }) => {
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
      if (type === messageTypes.MESSAGE || type === messageTypes.UPDATE) {
        return renderedMessage;
      } else if (type === messageTypes.CONNECT) {
        renderedMessage.text = `${display_name} has joined the chat`;
        return renderedMessage;
      } else if (type === messageTypes.DISCONNECT) {
        renderedMessage.text = `${display_name} has left the chat`;
        return renderedMessage;
      }
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
export const interleavingMessages = messages => {
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

  const interleavedMessages = Object.values(COLLECTION.messageList);
  return {
    userIds: Object.keys(COLLECTION.userIds),
    formattedMessages: formatMessages(interleavedMessages)
  };
};

export const createMessage = (value, currentUser) => {
  const lastMessageId = last(Object.keys(COLLECTION.messageIds));
  const userInfo = COLLECTION.userIds[currentUser];
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
