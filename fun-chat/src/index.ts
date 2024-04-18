import { Router, router } from './controllers/Router';
import './index.css';
import { loginStatus } from './logic/SessionStorage';
import { Pages } from './types.ts/Types';

class App {
  private router: Router;

  constructor() {
    this.router = router;
  }

  async render() {
    if (!loginStatus.checkLoginStatus()) {
      await this.router.navigate(Pages.authorization);
    } else {
      await this.router.navigate(Pages.main);
    }
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', async () => {
  await app.render();
});
