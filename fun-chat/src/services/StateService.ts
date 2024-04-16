import { AuthenticationPage } from '../pages/AuthenticationPage';
import { MainPage } from '../pages/MainPage';

export class StateService {
  private AuthenticationPage: AuthenticationPage | undefined = undefined;
  private mainPage: MainPage | undefined = undefined;
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  renderApp() {
    this.AuthenticationPage = new AuthenticationPage();
    this.root.append(this.AuthenticationPage.getElement());
  }
}

export const stateService = new StateService(document.body);
