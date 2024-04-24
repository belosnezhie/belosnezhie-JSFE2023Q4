import { AuthenticationPage } from '../pages/AuthenticationPage';
import { loginStatus } from '../services/SessionStorage';
import { userEvent } from '../services/UsersEventEmmiter';
import { ParamsToEmmit } from '../types.ts/Types';

export class AuthenticationController {
  private root: HTMLElement;
  private authenticationPage: AuthenticationPage;
  constructor(root: HTMLElement) {
    this.root = root;
    this.authenticationPage = new AuthenticationPage();

    userEvent.subscribe('SocketWasClosed', (data: ParamsToEmmit) => {
      console.log(data);

      this.authenticationPage.showLoadModal();
    });
  }

  renderPage() {
    this.root.append(this.authenticationPage.getElement());

    this.checkErrorStatus();
  }

  destroy() {
    this.authenticationPage.removeElement();
  }

  checkErrorStatus() {
    const errorText = loginStatus.getLogInError();

    if (errorText) {
      this.authenticationPage.showErrorModal(errorText);
    }
  }
}
