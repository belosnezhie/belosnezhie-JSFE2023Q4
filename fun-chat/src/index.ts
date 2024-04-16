import './index.css';
import { stateService } from './services/StateService';

class App {
  render() {
    stateService.renderApp();
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', () => {
  app.render();
});
