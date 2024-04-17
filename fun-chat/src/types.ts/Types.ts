export interface Route {
  path: string;
  callback: () => void;
}

export enum Pages {
  authorization = 'authorization',
  info = 'info',
  main = 'main',
  not_found = 'not_found',
}
