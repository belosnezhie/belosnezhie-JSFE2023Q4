import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { loginStatus } from '../logic/SessionStorage';
import { MainPage } from '../pages/MainPage';
import { userEvent } from '../services/UsersEventEmmiter';
import { WebSocketService } from '../services/WebSocketService';
import { ParamsToEmmit, User, UserData, UsersParams } from '../types.ts/Types';

export class MainController {
  private root: HTMLElement;
  private mainPage: MainPage;
  private header: Header;
  private footer: Footer;
  private webSocketService: WebSocketService;
  private authUsers: User[] | undefined;
  private UNAuthUsers: User[] | undefined;

  constructor(root: HTMLElement) {
    this.root = root;
    this.mainPage = new MainPage();
    this.header = new Header();
    this.footer = new Footer();
    this.webSocketService = new WebSocketService();

    // Server Events
    userEvent.subscribe('getAllAuthUsers', (usersParams: ParamsToEmmit) => {
      this.authUsers = this.setUsers(usersParams);

      this.mainPage.updateAuthUsers(this.authUsers);
    });

    userEvent.subscribe('getAllUNAuthUsers', (usersParams: ParamsToEmmit) => {
      this.UNAuthUsers = this.setUsers(usersParams);

      this.mainPage.updateUNAuthUsers(this.UNAuthUsers);
    });
  }

  async renderPage() {
    this.root.append(this.header.getElement());
    this.root.append(this.mainPage.getElement());
    this.root.append(this.footer.getElement());
    const webSocket = await this.webSocketService.createConnection();

    const userDataFromSrorage: UserData = loginStatus.getUser();

    this.webSocketService.set(webSocket);

    this.webSocketService.logInUser(userDataFromSrorage);
    this.header.setUserName(userDataFromSrorage.name);
    this.webSocketService.getAllAuthUsers();
    this.webSocketService.getAllUNAuthUsers();
  }

  getPage() {
    return this.mainPage;
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
}
