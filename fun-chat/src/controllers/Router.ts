import { NotFoundPage } from '../pages/NotFoundPage';
import { loginStatus } from '../services/SessionStorage';
import { Pages, Route } from '../types.ts/Types';

import { AboutController } from './AboutController';
import { AuthenticationController } from './AuthenticationController';
import { MainController } from './MainController';

export class Router {
  private routes: Route[];
  private mainController: MainController;
  private authenticationController: AuthenticationController;
  private aboutController: AboutController;
  private notFoundPage: NotFoundPage | undefined = undefined;
  private root: HTMLElement = document.body;

  constructor() {
    this.routes = this.createRoutes();
    this.mainController = new MainController(this.root);
    this.authenticationController = new AuthenticationController(this.root);
    this.aboutController = new AboutController(this.root);

    window.addEventListener('popstate', () => {
      this.changeURL();
    });

    window.addEventListener('hashchange', () => {
      this.changeURL();
    });
  }

  public navigate(url: string) {
    window.history.pushState({}, url, `#${url}`);

    const path = this.findRoute(url);

    path.callback();
  }

  private changeURL() {
    if (window.location.hash) {
      const path = window.location.hash.slice(1);

      this.navigate(path);
    } else {
      const path = window.location.pathname.slice(1);

      this.navigate(path);
    }
  }

  private findRoute(url: string): Route {
    const route: Route | undefined = this.routes.find(
      (item) => item.path === url,
    );

    if (route) {
      return route;
    } else {
      return this.routes[this.routes.length - 1];
    }
  }

  renderApp() {
    this.renderAuth();
  }

  renderAuth() {
    this.mainController.destroy();
    this.authenticationController.destroy();
    this.aboutController.destroy();
    this.authenticationController = new AuthenticationController(this.root);
    this.authenticationController.renderPage();
  }

  async renderMain() {
    this.mainController.destroy();
    this.authenticationController.destroy();
    this.aboutController.destroy();
    this.mainController = new MainController(this.root);
    await this.mainController.renderPage();
  }

  renderAbout() {
    this.mainController.destroy();
    this.authenticationController.destroy();
    this.aboutController.destroy();
    this.aboutController = new AboutController(this.root);
    this.aboutController.renderPage();
  }

  renderNotFound() {
    this.mainController.destroy();
    this.authenticationController.destroy();
    this.notFoundPage = new NotFoundPage();
    this.root.append(this.notFoundPage.getElement());
  }

  private createRoutes(): Route[] {
    const routes = [
      {
        // auth page
        path: Pages.authorization,
        callback: () => {
          if (loginStatus.checkLoginStatus()) {
            this.navigate(Pages.main);

            return;
          }
          this.renderAuth();
        },
      },
      {
        // main page
        path: Pages.main,
        callback: async () => {
          if (!loginStatus.checkLoginStatus()) {
            this.navigate(Pages.authorization);

            return;
          }
          await this.renderMain();
        },
      },
      {
        // about page
        path: Pages.about,
        callback: () => {
          this.renderAbout();
        },
      },
      {
        // error page
        path: Pages.not_found,
        callback: () => {
          this.renderNotFound();
        },
      },
    ];

    return routes;
  }
}

export const router = new Router();
