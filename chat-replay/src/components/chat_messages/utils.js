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

/**
 * @description Hashes key value pairs to the collection
 * @param * {int} k
 * @param * {int} v
 * @param * {array} collection
 */
const storeId = (k, v, collection) => {
  !includes(collection) && set(collection, k, v);
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
      console.log("delete", obj);
    } else if (obj.payload.type === messageTypes.UPDATE) {
      console.log("update", obj);
    }
  });
  console.log("messageIds", COLLECTION.messageIds);
  const interleavedMessages = Object.values(COLLECTION.messageList);
  return interleavedMessages;
};
