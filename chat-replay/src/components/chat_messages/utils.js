import { forEach, set, includes } from "lodash";

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

const replaceText = (indexOfMessage, text) => {
  COLLECTION.messageList[indexOfMessage].payload.message.text = text;
};

/**
 * @description Hashes key value pairs to the collection
 * @param * {int} k
 * @param * {int} v
 * @param * {array} collection
 */
const storeId = (k, v, collection) => {
  !includes(collection) && set(collection, k, v);
};

const performDeletes = (obj, idx, removeMessage = false) => {
  const messageId = obj.payload?.message?.id;

  storeId(COLLECTION.deletedIds, idx, obj.delta);

  let indexToDelete = COLLECTION.messageIds[messageId];
  console.log(indexToDelete);
  if (removeMessage) {
    delete COLLECTION.messageList[indexToDelete];
  } else {
    replaceText(indexToDelete, "Message was deleted");
  }

  // delete type delete object
  delete COLLECTION.messageList[idx];
};

export const interleavingMessages = messages => {
  COLLECTION.messageList = { ...messages };
  console.log("messageList", COLLECTION.messageList);
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
      // performUpdates(obj, idx);
    }
  });
  console.log("deletedIds", COLLECTION.deletedIds);
  const interleavedMessages = Object.values(COLLECTION.messageList);
  return interleavedMessages;
};
