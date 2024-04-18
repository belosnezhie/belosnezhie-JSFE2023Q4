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

export interface ServereResponce {
  id: string;
  type: string;
  payload: User | User[];
}

export interface User {
  login: string;
  isLogined: boolean;
}

export interface UserData {
  name: string;
  password: string;
}
