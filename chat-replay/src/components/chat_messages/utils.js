// TODO: implement scroll to bottom functionality

import { forEach, set } from "lodash";

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
 * @description Returns a timestamp based on the delta
 * @param * {int} delta
 * @returns * {string} Returns the current time stamp with the difference in delta
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

/**
 * @description Hashes key value pairs to the collection
 * @param * {int} k
 * @param * {int} v
 * @param * {array} collection
 */
const storeId = (k, v, collection) => {
  !collection.hasOwnProperty(k) && set(collection, k, v);
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
    // TODO: add deleted time
  }

  // delete type delete object
  delete COLLECTION.messageList[idx];
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
    const messageId = obj.payload?.message?.id;
    const blackListedMessages =
      obj.payload.type !== messageTypes.DELETE &&
      obj.payload.type !== messageTypes.UPDATE;

    if (messageId && blackListedMessages) {
      storeId(messageId, idx, COLLECTION.messageIds);
    } else if (obj.payload.type === messageTypes.DELETE) {
      performDeletes(obj, idx);
    } else if (obj.payload.type === messageTypes.UPDATE) {
      //   performUpdates(obj, idx);
    }
  });
  console.log(COLLECTION.deletedIds);
  const interleavedMessages = Object.values(COLLECTION.messageList);
  return interleavedMessages;
};
