import { Router } from './controllers/Router';
import './index.css';
import { StateService } from './services/StateService';
import { Route } from './types.ts/Types';

class App {
  private router: Router;
  private state: StateService;

  constructor() {
    this.router = new Router(this.createRouts());
    this.state = new StateService(document.body);
  }

  render() {
    window.addEventListener('popstate', () => {
      console.log('test');
    });
    window.history.pushState({}, 'authorization', '#authorization');
    window.history.pushState({}, 'authorization', '#authorization');
  }

  private createRouts(): Route[] {
    const routes = [
      {
        // default page
        path: '',
        callback: () => {
          this.state.renderAuth();
        },
      },
      {
        // auth page
        path: 'authorization',
        callback: () => {
          this.state.renderAuth();
        },
      },
      {
        // main page
        path: 'main',
        callback: () => {
          this.state.renderMain();
        },
      },
      {
        // error page
        path: 'not_found',
        callback: () => {
          this.state.renderNotFound();
        },
      },
    ];

    return routes;
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', () => {
  app.render();
});
