import {
  DeletedMessagesPayload,
  DeliveredMessagesPayload,
  EditedMessagesPayload,
  ErrorResponse,
  MessagesPayload,
  ParamsToEmmit,
  ReadedMessagesPayload,
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
          const user: User = userResponse.payload.user;

          console.log(`Name of logined user: ${user.login}`);
        }

        if (responceType === 'USER_EXTERNAL_LOGIN') {
          const userResponse: SingleUserResponse = <SingleUserResponse>response;
          const user: User = userResponse.payload.user;

          const userParams: SingleUserParams = {
            login: user.login,
            isLogined: user.isLogined,
          };

          userEvent.emit('newUserLoggedIn', userParams);
        }

        if (responceType === 'USER_LOGOUT') {
          const userResponse: SingleUserResponse = <SingleUserResponse>response;
          const user: User = userResponse.payload.user;

          console.log(`Name of logOut user: ${user.login}`);
        }

        if (responceType === 'USER_EXTERNAL_LOGOUT') {
          const userResponse: SingleUserResponse = <SingleUserResponse>response;
          const user: User = userResponse.payload.user;

          const userParams: SingleUserParams = {
            login: user.login,
            isLogined: user.isLogined,
          };

          userEvent.emit('userLoggedOut', userParams);
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
                  isEdited: item.status.isEdited,
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

        if (responceType === 'MSG_DELIVER') {
          const messageResponce: DeliveredMessagesPayload = <
            DeliveredMessagesPayload
          >response;

          const messageId: ParamsToEmmit = messageResponce.payload.message.id;

          userEvent.emit('messageWasDelivered', messageId);
        }

        if (responceType === 'MSG_DELETE') {
          const messageResponce: DeletedMessagesPayload = <
            DeletedMessagesPayload
          >response;

          const messageId: ParamsToEmmit = messageResponce.payload.message.id;

          userEvent.emit('messageWasDeleted', messageId);
        }

        if (responceType === 'MSG_EDIT') {
          const messageResponce: EditedMessagesPayload = <
            EditedMessagesPayload
          >response;

          const data: ParamsToEmmit = {
            id: messageResponce.payload.message.id,
            text: messageResponce.payload.message.text,
            status: messageResponce.payload.message.status.isEdited,
          };

          userEvent.emit('messageWasEdited', data);
        }

        if (responceType === 'MSG_READ') {
          const messageResponce: ReadedMessagesPayload = <
            ReadedMessagesPayload
          >response;

          const messageId: ParamsToEmmit = messageResponce.payload.message.id;

          userEvent.emit('messageWasRead', messageId);
        }

        if (responceType === 'ERROR') {
          const errorResponce: ErrorResponse = <ErrorResponse>response;

          const errorType: string = errorResponce.payload.error;

          if (errorType === 'a user with this login is already authorized') {
            const errorText: ParamsToEmmit = {
              text: 'A user with this login is already authorized, try another one.',
            };

            userEvent.emit('userIsAlreadyLogIn', errorText);
          }

          if (errorType === 'incorrect password') {
            const errorText: ParamsToEmmit = {
              text: 'Incorrect password, try another one.',
            };

            userEvent.emit('wrongPassword', errorText);
          }
        }
      },
    );

    this.webSocket.addEventListener('close', (event: CloseEvent) => {
      if (event.code === 1000) {
        return;
      }
      const data: ParamsToEmmit = {};

      userEvent.emit('SocketWasClosed', data);
    });
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

  public logOutUser(userData: UserData) {
    const id: string = this.createRequestId();
    const data = {
      id: id,
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login: userData.name,
          password: userData.password,
        },
      },
    };

    this.webSocket?.send(JSON.stringify(data));
    this.webSocket?.close(1000);
  }

  public closeConnection() {
    this.webSocket?.close(1000);
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

  public editeMessage(id: string, text: string) {
    const data = {
      id: this.createRequestId(),
      type: 'MSG_EDIT',
      payload: {
        message: {
          id: id,
          text: text,
        },
      },
    };

    this.webSocket?.send(JSON.stringify(data));
  }

  public readMessage(idArr: string[]) {
    idArr.forEach((id) => {
      const data = {
        id: this.createRequestId(),
        type: 'MSG_READ',
        payload: {
          message: {
            id: id,
          },
        },
      };

      this.webSocket?.send(JSON.stringify(data));
    });
  }

  private createRequestId(): string {
    return String(Date.now());
  }
}
