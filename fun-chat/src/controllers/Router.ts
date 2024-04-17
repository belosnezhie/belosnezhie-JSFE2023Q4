// к этому классу будут обращаться компоненты
// чтобы делать навигацию
// он глобальный для всего приложения

import { BaseComponent } from '../components/Component';
import { AuthenticationPage } from '../pages/AuthenticationPage';
import { MainPage } from '../pages/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Pages, Route } from '../types.ts/Types';

export class Router {
  private routes: Route[];
  private pages: BaseComponent[];
  private authenticationPage: AuthenticationPage | undefined = undefined;
  private mainPage: MainPage | undefined = undefined;
  private notFoundPage: NotFoundPage | undefined = undefined;
  private root: HTMLElement = document.body;

  constructor() {
    this.routes = this.createRoutes();
    this.pages = [];

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

  private createRoutes(): Route[] {
    const routes = [
      {
        // default page
        path: '',
        callback: () => {
          this.renderAuth();
        },
      },
      {
        // auth page
        path: Pages.authorization,
        callback: () => {
          this.renderAuth();
        },
      },
      {
        // main page
        path: Pages.main,
        callback: () => {
          this.renderMain();
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
