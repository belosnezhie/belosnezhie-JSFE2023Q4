import { AuthenticationPage } from '../pages/AuthenticationPage';
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
  }

  destroy() {
    this.authenticationPage.removeElement();
  }
}
