import { Router, router } from './controllers/Router';
import './index.css';
import { Pages } from './types.ts/Types';

class App {
  private router: Router;

  constructor() {
    this.router = router;
  }

  render() {
    this.router.navigate(Pages.authorization);
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', () => {
  app.render();
});
