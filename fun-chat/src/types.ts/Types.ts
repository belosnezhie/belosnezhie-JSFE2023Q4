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

export interface User {
  isLogined: boolean;
  login: string;
}

export interface UserData {
  name: string;
  password: string;
}
