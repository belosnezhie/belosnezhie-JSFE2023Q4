import { ServerResponse, User, UserData } from '../types.ts/Types';

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
          const user: User = response.payload.user;

          console.log(`Name of logined user: ${user.login}`);
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
