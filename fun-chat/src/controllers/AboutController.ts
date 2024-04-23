import { AboutPage } from '../pages/AboutPage';
import { loginStatus } from '../services/SessionStorage';
import { userEvent } from '../services/UsersEventEmmiter';
import { Pages, ParamsToEmmit } from '../types.ts/Types';

import { router } from './Router';

export class AboutController {
  private root: HTMLElement;
  private aboutPage: AboutPage;

  constructor(root: HTMLElement) {
    this.root = root;
    this.aboutPage = new AboutPage();

    userEvent.subscribe('userReturned', (data: ParamsToEmmit) => {
      if (data) {
        console.log(data);
      }

      if (!loginStatus.getUser()) {
        router.navigate(Pages.authorization);
      } else {
        router.navigate(Pages.main);
      }
    });

    userEvent.subscribe('SocketWasClosed', (data: ParamsToEmmit) => {
      console.log(data);

      this.aboutPage.showLoadModal();
    });
  }

  renderPage() {
    this.root.append(this.aboutPage.getElement());
  }

  destroy() {
    this.aboutPage.removeElement();
  }
}
