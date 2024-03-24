import './index.css';
import { state } from './services/CarsState';

class App {
  async render() {
    await state.renderPage();
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', async () => {
  await app.render();
});
