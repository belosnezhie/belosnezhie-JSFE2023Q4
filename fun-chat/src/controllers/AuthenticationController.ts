import { AuthenticationPage } from '../pages/AuthenticationPage';

export class AuthenticationController {
  private root: HTMLElement;
  private authenticationPage: AuthenticationPage;
  constructor(root: HTMLElement) {
    this.root = root;
    this.authenticationPage = new AuthenticationPage();
  }

  renderPage() {
    this.root.append(this.authenticationPage.getElement());
  }

  destroy() {
    this.authenticationPage.removeElement();
  }
}
