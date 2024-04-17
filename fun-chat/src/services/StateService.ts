import { BaseComponent } from '../components/Component';
import { AuthenticationPage } from '../pages/AuthenticationPage';
import { MainPage } from '../pages/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export class StateService {
  private pages: BaseComponent[];
  private authenticationPage: AuthenticationPage | undefined = undefined;
  private mainPage: MainPage | undefined = undefined;
  private notFoundPage: NotFoundPage | undefined = undefined;
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;

    this.pages = [];
  }

  renderApp() {
    this.authenticationPage = new AuthenticationPage();
    this.destroyPage(this.authenticationPage);
    this.root.append(this.authenticationPage.getElement());
  }

  renderAuth() {
    this.authenticationPage = new AuthenticationPage();
    this.destroyPage(this.authenticationPage);
    this.root.append(this.authenticationPage.getElement());
  }

  renderMain() {
    this.mainPage = new MainPage();
    this.destroyPage(this.mainPage);
    this.root.append(this.mainPage.getElement());
  }

  renderNotFound() {
    this.notFoundPage = new NotFoundPage();
    this.destroyPage(this.notFoundPage);
    this.root.append(this.notFoundPage.getElement());
  }

  private destroyPage(page: BaseComponent) {
    this.pages.forEach((item) => item.removeElement());
    if (!this.pages.includes(page)) {
      this.pages.push(page);
    }
  }
}

export const stateService = new StateService(document.body);
