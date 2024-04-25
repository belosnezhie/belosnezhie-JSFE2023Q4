import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { router } from '../controllers/Router';
import { MainPage } from '../pages/MainPage';
import { loginStatus } from '../services/SessionStorage';
import { userEvent } from '../services/UsersEventEmmiter';
import { WebSocketService } from '../services/WebSocketService';
import {
  EditedMessageData,
  ErrorText,
  IdData,
  Pages,
  ParamsToEmmit,
  ResponseMessageData,
  SendMessageData,
  User,
  UserData,
  UsersParams,
} from '../types.ts/Types';

export class MainController {
  private root: HTMLElement;
  private mainPage: MainPage;
  private header: Header;
  private footer: Footer;
  private webSocketService: WebSocketService;
  private authUsers: User[] | undefined;
  private UNAuthUsers: User[] | undefined;
  private selectedUser: string | undefined;
  private loggedUser: string = '';
  private isConnected = false;

  constructor(root: HTMLElement) {
    this.root = root;
    this.mainPage = new MainPage();
    this.header = new Header();
    this.footer = new Footer();
    this.webSocketService = new WebSocketService();
    this.subscribeToEvents();
  }

  async renderPage() {
    this.root.append(this.header.getElement());
    this.root.append(this.mainPage.getElement());
    this.root.append(this.footer.getElement());
    if (this.isConnected === false) {
      const webSocket = await this.webSocketService.createConnection();

      this.webSocketService.set(webSocket);
    }
    this.loginCurrentUser();
    this.isConnected = true;
  }

  loginCurrentUser() {
    const userDataFromSrorage: UserData | undefined = loginStatus.getUser();

    if (userDataFromSrorage) {
      this.webSocketService.logInUser(userDataFromSrorage);
      this.loggedUser = userDataFromSrorage.name;
    }

    this.header.setUserName(this.loggedUser);
    this.webSocketService.getAllAuthUsers();
    this.webSocketService.getAllUNAuthUsers();
  }

  destroy() {
    this.unSubcribeFromEvents();
    this.header.removeElement();
    this.mainPage.removeElement();
    this.footer.removeElement();
  }

  unSubcribeFromEvents() {
    userEvent.unsubscribeAll('getAllAuthUsers');
    userEvent.unsubscribeAll('getAllUNAuthUsers');
    userEvent.unsubscribeAll('newUserLoggedIn');
    userEvent.unsubscribeAll('dialogHistory');
    userEvent.unsubscribeAll('messageStatus');
    userEvent.unsubscribeAll('messageWasDeleted');
    userEvent.unsubscribeAll('messageWasEdited');
    userEvent.unsubscribeAll('userWasSelected');
    userEvent.unsubscribeAll('messageWasSent');
    userEvent.unsubscribeAll('userDeletedMessage');
    userEvent.unsubscribeAll('userEditedMessage');
    userEvent.unsubscribeAll('logoutUser');
    userEvent.unsubscribeAll('userLoggedOut');
    userEvent.unsubscribeAll('userIsAlreadyLogIn');
    userEvent.unsubscribeAll('messageWasDelivered');
  }

  subscribeToEvents() {
    // Server Events
    userEvent.subscribe('getAllAuthUsers', (usersParams: ParamsToEmmit) => {
      this.authUsers = this.setUsers(usersParams).filter(
        (user) => user.login !== this.loggedUser,
      );

      this.mainPage.updateAuthUsers(this.authUsers);
    });

    userEvent.subscribe('getAllUNAuthUsers', (usersParams: ParamsToEmmit) => {
      this.UNAuthUsers = this.setUsers(usersParams);

      this.mainPage.updateUNAuthUsers(this.UNAuthUsers);
    });

    userEvent.subscribe(
      'newUserLoggedIn',
      (emmitedUserParams: ParamsToEmmit) => {
        const user: User = this.setUser(emmitedUserParams);

        console.log(`User loged in: ${user.login}`);

        this.webSocketService.getAllAuthUsers();
        this.webSocketService.getAllUNAuthUsers();
      },
    );

    userEvent.subscribe('userLoggedOut', (emmitedUserParams: ParamsToEmmit) => {
      const user: User = this.setUser(emmitedUserParams);

      console.log(`User loged out: ${user.login}`);

      this.webSocketService.getAllAuthUsers();
      this.webSocketService.getAllUNAuthUsers();
    });

    userEvent.subscribe('userIsAlreadyLogIn', (errorData: ParamsToEmmit) => {
      const errorText: ErrorText = <ErrorText>errorData;

      loginStatus.clearLoginStatus();
      loginStatus.setLogInError(errorText.text);

      this.webSocketService.closeConnection();

      router.navigate(Pages.authorization);
    });

    userEvent.subscribe('wrongPassword', (errorData: ParamsToEmmit) => {
      const errorText: ErrorText = <ErrorText>errorData;

      loginStatus.clearLoginStatus();
      loginStatus.setLogInError(errorText.text);

      router.navigate(Pages.authorization);
    });

    userEvent.subscribe('dialogHistory', (dialogHistoryData: ParamsToEmmit) => {
      let dialogHistory = this.setDialogHistory(dialogHistoryData);

      this.mainPage.clearDialogHistory();

      dialogHistory = dialogHistory.map((item) => {
        return this.checkMessageType(item);
      });

      this.mainPage.renderDialogHistory(dialogHistory);
    });

    userEvent.subscribe('messageStatus', (messageData: ParamsToEmmit) => {
      let message: ResponseMessageData = this.setMessage(messageData);

      if (message.from === this.loggedUser) {
        if (message.to === this.selectedUser) {
          message = this.checkMessageType(message);
          this.mainPage.renderMessage(message);
        }
      } else {
        if (
          message.to === this.loggedUser &&
          message.from === this.selectedUser
        ) {
          message = this.checkMessageType(message);
          this.mainPage.renderMessage(message);
        }
      }
    });

    userEvent.subscribe('messageWasDelivered', (messageId: ParamsToEmmit) => {
      this.mainPage.delivereMessage(String(messageId));
    });

    userEvent.subscribe('messageWasDeleted', (messageId: ParamsToEmmit) => {
      this.mainPage.deleteMessage(String(messageId));
    });

    userEvent.subscribe('messageWasEdited', (messageData: ParamsToEmmit) => {
      const data = this.setEditedMessage(messageData);

      this.mainPage.editMessage(data.id, data.text);
    });

    userEvent.subscribe('messageWasRead', (messageId: ParamsToEmmit) => {
      this.mainPage.updateReadedMessage(String(messageId));
    });

    userEvent.subscribe('SocketWasClosed', (data: ParamsToEmmit) => {
      console.log(data);

      this.mainPage.showLoadModal();
    });

    // User Events
    userEvent.subscribe('logoutUser', (userData: ParamsToEmmit) => {
      if (userData) {
        console.log(`Log out user: ${String(userData)}`);
      }

      this.logOutUser();

      loginStatus.clearLoginStatus();
      router.navigate(Pages.authorization);
    });

    userEvent.subscribe('logoutUserToAbout', (userData: ParamsToEmmit) => {
      if (userData) {
        console.log(`Log out user: ${String(userData)}`);
      }

      this.logOutUser();
    });

    userEvent.subscribe('userWasSelected', (userParams: ParamsToEmmit) => {
      const selectedUser = this.setUser(userParams);

      this.selectedUser = selectedUser.login;

      this.mainPage.setSelectedUser(selectedUser);

      this.webSocketService.getMessageHistory(this.selectedUser);
    });

    userEvent.subscribe('messageWasSent', (message: ParamsToEmmit) => {
      if (!this.selectedUser) {
        throw new Error('User is not selected!');
      }

      const data: SendMessageData = {
        to: this.selectedUser,
        text: String(message),
      };

      this.webSocketService.sendMessage(data);
    });

    userEvent.subscribe('userDeletedMessage', (id: ParamsToEmmit) => {
      this.webSocketService.deleteMessage(String(id));
    });

    userEvent.subscribe('userEditedMessage', (messageData: ParamsToEmmit) => {
      const data: EditedMessageData = <EditedMessageData>messageData;

      this.webSocketService.editeMessage(data.id, data.text);
    });

    userEvent.subscribe('userReadMessage', (idData: ParamsToEmmit) => {
      const data: IdData = <IdData>idData;

      this.webSocketService.readMessage(data.idArr);
    });
  }

  logOutUser() {
    const loggedInUser = loginStatus.getUser();

    if (loggedInUser) {
      this.webSocketService.logOutUser(loggedInUser);
    }
  }

  setUsers(usersParams: ParamsToEmmit) {
    const users: User[] = (<UsersParams>usersParams).users.map((user) => {
      const result: User = {
        isLogined: user.isLogined,
        login: user.login,
      };

      return result;
    });

    return users;
  }

  setUser(user: ParamsToEmmit) {
    const selectedUser: User = <User>user;

    return selectedUser;
  }

  setMessage(message: ParamsToEmmit) {
    const messageParams: ResponseMessageData = <ResponseMessageData>message;

    return messageParams;
  }

  setDialogHistory(dialogHistoryData: ParamsToEmmit) {
    const dialogHistory = (<ResponseMessageData[]>dialogHistoryData).map(
      (item) => {
        const messageParams = item;

        return messageParams;
      },
    );

    return dialogHistory;
  }

  setEditedMessage(messageData: ParamsToEmmit) {
    const data: EditedMessageData = <EditedMessageData>messageData;

    return data;
  }

  checkMessageType(message: ResponseMessageData) {
    if (message.to === this.loggedUser) {
      message.type = 'received';
    } else {
      message.type = 'sent';
    }

    return message;
  }
}
