import './index.css';
import { carsController } from './services/CarsController';

class App {
  async render() {
    await carsController.renderPage();
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', async () => {
  await app.render();
});
