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

export interface ServerResponse {
  id: string;
  payload: Payload;
  type: string;
}

export interface Payload {
  user: User;
}

export interface User {
  isLogined: boolean;
  login: string;
}

export interface UserData {
  name: string;
  password: string;
}
