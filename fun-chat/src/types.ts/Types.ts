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

export interface MessagePayloads extends ServerResponse {
  payload: {
    message: {
      id: string;
      from: string;
      to: string;
      text: string;
      datetime: number;
      status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
      };
    };
  };
}

export interface User {
  isLogined: boolean;
  login: string;
}

export interface UserData {
  name: string;
  password: string;
}

export interface SendMessageData {
  to: string;
  text: string;
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
