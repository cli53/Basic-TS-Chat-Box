export interface ObjectLiteral {
  [key: string]: any;
}

export interface Message {
  id: number;
  text: string;
}

export interface User {
  id: number;
  user_name: string;
  display_name: string;
}

export interface FormatMessages {
  display_name: string;
  messageId: number;
  text: string;
  time: string;
  userId: number;
  avatar: string;
}

export interface Payload {
  type: string;
  user: User | ObjectLiteral;
  message: Message | ObjectLiteral;
}

export interface Messages {
  delta: number;
  payload: Payload;
}

export interface DeleteIds {
  [key: number]: string;
}

export interface MessageIds {
  [key: number]: number;
}

export interface MessageLists {
  [key: number]: Messages;
}
export interface UserIds {
  [key: number]: User;
}
