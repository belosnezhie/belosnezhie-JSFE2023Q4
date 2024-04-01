import './index.css';
import { stateService } from './services/StateService';

class App {
  async render() {
    await stateService.renderApp();
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', async () => {
  await app.render();
});
