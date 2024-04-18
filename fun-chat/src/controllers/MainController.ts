import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { loginStatus } from '../logic/SessionStorage';
import { MainPage } from '../pages/MainPage';
import { userEvent } from '../services/UsersEventEmmiter';
import { WebSocketService } from '../services/WebSocketService';
import { ParamsToEmmit, User, UserData } from '../types.ts/Types';

const testAuthUsers: User[] = [
  {
    login: 'test',
    isLogined: true,
  },
  {
    login: 'test2',
    isLogined: true,
  },
];

const testUnAuthUsers: User[] = [
  {
    login: 'test3',
    isLogined: false,
  },
  {
    login: 'test4',
    isLogined: false,
  },
];

export class MainController {
  private root: HTMLElement;
  private mainPage: MainPage;
  private header: Header;
  private footer: Footer;
  private webSocketService: WebSocketService;

  constructor(root: HTMLElement) {
    this.root = root;
    this.mainPage = new MainPage(testAuthUsers, testUnAuthUsers);
    this.header = new Header();
    this.footer = new Footer();
    this.webSocketService = new WebSocketService();

    userEvent.subscribe('getAllAuthUsers', (usersParams: ParamsToEmmit) => {
      this.mainPage.updateAuthUsers(usersParams);
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
  }

  updateOnlineUsers() {
    console.log('Id like to update users');
  }

  getPage() {
    return this.mainPage;
  }
}
