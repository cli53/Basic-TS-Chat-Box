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

 
const deletedIds = []

const messageIds = []

const userIds = []

const messageTypes = {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    MESSAGE: "message",
    UPDATE: "update",
    DELETE: "delete"
  };


const storeDeleteIds = (obj) => {
    deletedIds.push(obj?.payload?.message?.id)
}

const storeUserIds = (id) => {
    userIds.push(id)
}

export const trackMessages = (obj) => {
    if(obj.payload.user) {
        storeUserIds(obj.payload.user.id)
    }
    if(obj.payload.type === messageTypes.DELETE) {
        storeDeleteIds(obj)
    } else if()
}

export const getTimeStamp = (delta) => {
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      }
      const timeDiff= Date.now() - delta
      const time = new Date(timeDiff).toLocaleString('en-US', timeOptions)
      return time
}