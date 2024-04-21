// Routing

export interface Route {
  path: string;
  callback: () => void;
  asynkCallback?: (userData: UserData) => Promise<void>;
}

export enum Pages {
  authorization = 'authorization',
  info = 'info',
  main = 'main',
  not_found = 'not_found',
}

export interface ParamsToEmmit {}

export interface SingleUserParams extends ParamsToEmmit {
  isLogined: boolean;
  login: string;
}

export interface UsersParams extends ParamsToEmmit {
  users: SingleUserParams[];
}

// Server Responses

export interface ServerResponse {
  id: string;
  type: string;
}

export interface UsersResponse extends ServerResponse {
  id: string;
  type: string;
  payload: {
    users: User[];
  };
}

export interface SingleUserResponse extends ServerResponse {
  payload: User;
}

export interface SingleMessagePayload extends ServerResponse {
  payload: {
    message: MessageResponse;
  };
}

export interface MessagesPayload extends ServerResponse {
  payload: {
    messages: MessageResponse[];
  };
}

export interface DeletedMessagesPayload extends ServerResponse {
  payload: {
    message: {
      id: string;
      status: {
        isDeleted: boolean;
      };
    };
  };
}

export interface EditedMessagesPayload extends ServerResponse {
  payload: {
    message: {
      id: string;
      text: string;
      status: {
        isEdited: boolean;
      };
    };
  };
}

export interface MessageResponse {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: MessageStatus;
}

export interface MessageStatus {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
}

// Types for rendering

export interface User {
  isLogined: boolean;
  login: string;
}

export interface ResponseMessageData {
  type: string;
  id: string;
  text: string;
  from: string;
  to: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
}

// Types to create request

export interface UserData {
  name: string;
  password: string;
}

export interface SendMessageData {
  to: string;
  text: string;
}

export interface EditedMessageData {
  id: string;
  text: string;
}
