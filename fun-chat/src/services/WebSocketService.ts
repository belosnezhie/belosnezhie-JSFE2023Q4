import {
  ServerResponse,
  SingleUserParams,
  SingleUserResponse,
  User,
  UserData,
  UsersParams,
  UsersResponse,
} from '../types.ts/Types';

import { userEvent } from './UsersEventEmmiter';

export class WebSocketService {
  private webSocket: WebSocket | undefined;

  public createConnection(): Promise<WebSocket> {
    const connectionPromise: Promise<WebSocket> = new Promise(function (
      resolve,
      reject,
    ) {
      const server = new WebSocket('ws://localhost:4000');

      server.onopen = function () {
        resolve(server);
      };
      server.onerror = function (err) {
        reject(err);
      };
    });

    return connectionPromise;
  }

  public set(webSocket: WebSocket) {
    this.webSocket = webSocket;

    this.webSocket.addEventListener(
      'message',
      (event: MessageEvent<string>) => {
        const response: ServerResponse = <ServerResponse>JSON.parse(event.data);
        const responceType: string = response.type;

        if (responceType === 'USER_LOGIN') {
          const userResponse: SingleUserResponse = <SingleUserResponse>response;
          const user: User = userResponse.payload;

          console.log(`Name of logined user: ${user.login}`);
        }

        if (responceType === 'USER_EXTERNAL_LOGIN') {
          const userResponse: SingleUserResponse = <SingleUserResponse>response;
          const user: User = userResponse.payload;

          console.log(`Urers were notified about new user: ${user.login}`);
        }

        if (responceType === 'USER_ACTIVE') {
          const usersResponse: UsersResponse = <UsersResponse>response;
          const users: SingleUserParams[] = usersResponse.payload.users.map(
            (user) => {
              const result: SingleUserParams = {
                isLogined: user.isLogined,
                login: user.login,
              };

              return result;
            },
          );

          console.log(users);

          const usersParams: UsersParams = { users: users };

          userEvent.emit('getAllAuthUsers', usersParams);
        }
      },
    );
  }

  public logInUser(userData: UserData) {
    const id: string = this.createRequestId();

    const data = {
      id: id,
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: userData.name,
          password: userData.password,
        },
      },
    };

    this.webSocket?.send(JSON.stringify(data));
  }

  public getAllAuthUsers() {
    const data = {
      id: this.createRequestId(),
      type: 'USER_ACTIVE',
      payload: null,
    };

    return this.webSocket?.send(JSON.stringify(data));
  }

  sayHi() {
    const id: string = this.createRequestId();

    const data = {
      id: id,
      type: 'MSG_SEND',
      payload: {
        message: {
          to: 'test1',
          text: 'hohoho',
        },
      },
    };

    this.webSocket?.send(JSON.stringify(data));
  }

  private createRequestId(): string {
    return String(Date.now());
  }
}
