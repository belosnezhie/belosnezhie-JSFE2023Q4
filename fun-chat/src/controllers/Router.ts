// к этому классу будут обращаться компоненты
// чтобы делать навигацию
// он глобальный для всего приложения

import { Route } from '../types.ts/Types';

export class Router {
  private routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;

    window.addEventListener('popstate', () => {
      this.changeURL();
    });

    window.addEventListener('hashchange', () => {
      this.changeURL();
    });
  }

  private navigate(url: string) {
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
}
