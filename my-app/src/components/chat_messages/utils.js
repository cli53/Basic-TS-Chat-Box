// TODO: implement scroll to bottom functionality
// TODO: implement rendering emojis

import { includes, forEach, set } from "lodash";

const COLLECTION = {
  deletedIds: {},
  messageIds: {},
  messageList: {}
};

const messageTypes = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  MESSAGE: "message",
  UPDATE: "update",
  DELETE: "delete"
};

/**
 * Returns a timestamp based on the delta
 * @param {int} delta
 * @returns * {string}
 */
export const getTimeStamp = delta => {
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  };
  const timeDiff = Date.now() - delta;
  const time = new Date(timeDiff).toLocaleString("en-US", timeOptions);
  return time;
};

const storeId = (k, v, collection) => {
  !includes(collection) && set(collection, k, v);
};

const replaceText = (indexOfMessage, text) => {
  COLLECTION.messageList[indexOfMessage].payload.message.text = text;
};

const performDeletes = (obj, idx, removeMessage = false) => {
  const messageId = obj.payload?.message?.id;

  // DELETE: remove messages based on message from keys of COLLECTION.messageList

  // store deleted type message with timestamp
  storeId(COLLECTION.deletedIds, idx, getTimeStamp(obj.delta));

  let indexToDelete = COLLECTION.messageIds[messageId];

  // the delete message
  if (removeMessage) {
    delete COLLECTION.messageList[indexToDelete];
  } else {
    replaceText(indexToDelete, "Message was deleted");

    // COLLECTION.messageList[indexToDelete].payload.message.text =
    //   "Message was deleted";
  }

  // delete type delete object
  delete COLLECTION.messageList[idx];
};

const performUpdates = (obj, idx) => {
  const messageId = obj.payload?.message?.id;

  if (messageId) {
    let indexToUpdate = COLLECTION.messageIds[messageId];
    replaceText(indexToUpdate, obj.payload.message.text);
    // COLLECTION.messageList[indexToUpdate].payload.message.text =
    //   obj.payload.message.text;

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

export const interleavingMessages = messages => {
  COLLECTION.messageList = { ...messages };
  forEach(messages, (obj, idx) => {
    const messageId = obj.payload?.message?.id;
    const blackListedMessages =
      obj.payload.type !== messageTypes.DELETE &&
      obj.payload.type !== messageTypes.UPDATE;

    if (messageId && blackListedMessages) {
      storeId(messageId, idx, COLLECTION.messageIds);
    } else if (obj.payload.type === messageTypes.DELETE) {
      performDeletes(obj, idx);
    } else if (obj.payload.type === messageTypes.UPDATE) {
      performUpdates(obj, idx);
    }
  });
  return Object.values(COLLECTION.messageList);
};
