import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MainPage } from '../pages/MainPage';
import { WebSocketService } from '../services/WebSocketService';
import { User, UserData } from '../types.ts/Types';

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
    this.header = new Header('test');
    this.footer = new Footer();
    this.webSocketService = new WebSocketService();
  }

  async renderPage(userData: UserData) {
    this.root.append(this.header.getElement());
    this.root.append(this.mainPage.getElement());
    this.root.append(this.footer.getElement());
    const webSocket = await this.webSocketService.createConnection();

    this.webSocketService.set(webSocket);
    this.webSocketService.logInUser(userData);
  }

  updateOnlineUsers() {
    console.log('Id like to update users');
  }

  getPage() {
    return this.mainPage;
  }
}
