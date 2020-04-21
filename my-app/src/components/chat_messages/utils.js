// TODO: implement scroll to bottom functionality
// TODO: implement rendering emojis
// TODO: calculate time

// Use Interleaving Pattern
// TODO: Deleted messages
// if they have the same message ID, remove the originally message
// filter out deleted messages
// store them in a  object
// loop the
// TODO: Updated messages
import { includes, forEach, set, isEmpty } from "lodash";

const COLLECTION = {
  deletedIds: {},
  messageIds: {},
  userIds: []
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
    // COLLECTION.messageList[indexToDelete] = COLLECTION.messageList[
    //   indexToDelete
    // ].payload.message.text = "Message was deleted";
    COLLECTION.messageList[indexToDelete].payload.message.text =
      "Message was deleted";
  }

  // delete type delete object
  delete COLLECTION.messageList[idx];
};

export const interleavingMessages = messages => {
  COLLECTION.messageList = { ...messages };
  forEach(messages, (obj, idx) => {
    const userId = obj.payload?.user?.id;
    if (userId) {
      storeId(userId, COLLECTION.userIds);
    }

    const messageId = obj.payload?.message?.id;
    const blackListedMessages =
      obj.payload.type !== messageTypes.DELETE ||
      obj.payload.type === messageTypes.UPDATE;
    if (messageId && blackListedMessages) {
      storeId(messageId, idx, COLLECTION.messageIds);
    } else if (obj.payload.type === messageTypes.DELETE) {
      performDeletes(obj, idx);
    } else if (obj.payload.type === messageTypes.UPDATE) {
      // find the message in messageList
      const list = Object.values(COLLECTION.messageList);

      const userObj = obj.payload?.user;
      if (!isEmpty(userObj)) {
        for (let message in list) {
          if (message.payload?.user.id === userObj.id) {
            message.payload.user = userObj;
          }
        }
      }
      // COLLECTION.messageList[messageId];
      // reassign user
      // if it's a message, use same logic as delete
      // find based on Id and replace message
    }
  });

  return Object.values(COLLECTION.messageList);
};
