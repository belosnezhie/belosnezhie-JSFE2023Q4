import {
  DeletedMessagesPayload,
  MessagesPayload,
  ParamsToEmmit,
  ResponseMessageData,
  SendMessageData,
  ServerResponse,
  SingleMessagePayload,
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

          const userParams: SingleUserParams = {
            login: user.login,
            isLogined: user.isLogined,
          };

          userEvent.emit('newUserLoggedIn', userParams);
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

          const usersParams: UsersParams = { users: users };

          userEvent.emit('getAllAuthUsers', usersParams);
        }

        if (responceType === 'USER_INACTIVE') {
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

          const usersParams: UsersParams = { users: users };

          userEvent.emit('getAllUNAuthUsers', usersParams);
        }

        if (responceType === 'MSG_FROM_USER') {
          const messagesResponce: MessagesPayload = <MessagesPayload>response;

          const data: ResponseMessageData[] =
            messagesResponce.payload.messages.map((item) => {
              const message: ResponseMessageData = {
                type: '',
                id: item.id,
                from: item.from,
                to: item.to,
                text: item.text,
                datetime: item.datetime,
                status: {
                  isDelivered: item.status.isDelivered,
                  isReaded: item.status.isReaded,
                  isEdited: item.status.isReaded,
                },
              };

              return message;
            });

          userEvent.emit('dialogHistory', data);
        }

        if (responceType === 'MSG_SEND') {
          const messageResponce: SingleMessagePayload = <SingleMessagePayload>(
            response
          );

          const data: ResponseMessageData = {
            type: '',
            id: messageResponce.payload.message.id,
            from: messageResponce.payload.message.from,
            to: messageResponce.payload.message.to,
            text: messageResponce.payload.message.text,
            datetime: messageResponce.payload.message.datetime,
            status: {
              isDelivered: messageResponce.payload.message.status.isDelivered,
              isReaded: messageResponce.payload.message.status.isReaded,
              isEdited: messageResponce.payload.message.status.isReaded,
            },
          };

          userEvent.emit('messageStatus', data);
        }

        if (responceType === 'MSG_DELETE') {
          const messagesResponce: DeletedMessagesPayload = <
            DeletedMessagesPayload
          >response;

          const messageId: ParamsToEmmit = messagesResponce.payload.message.id;

          console.log(`id from server: ${String(messageId)}`);

          userEvent.emit('messageWasDeleted', messageId);
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
      type: 'USER_INACTIVE',
      payload: null,
    };

    this.webSocket?.send(JSON.stringify(data));
  }

  public getAllUNAuthUsers() {
    const data = {
      id: this.createRequestId(),
      type: 'USER_ACTIVE',
      payload: null,
    };

    this.webSocket?.send(JSON.stringify(data));
  }

  public sendMessage(messageData: SendMessageData) {
    const data = {
      id: this.createRequestId(),
      type: 'MSG_SEND',
      payload: {
        message: {
          to: messageData.to,
          text: messageData.text,
        },
      },
    };

    this.webSocket?.send(JSON.stringify(data));
  }

  public getMessageHistory(login: string) {
    const data = {
      id: this.createRequestId(),
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login: login,
        },
      },
    };

    this.webSocket?.send(JSON.stringify(data));
  }

  public deleteMessage(id: string) {
    const data = {
      id: this.createRequestId(),
      type: 'MSG_DELETE',
      payload: {
        message: {
          id: id,
        },
      },
    };

    this.webSocket?.send(JSON.stringify(data));
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
