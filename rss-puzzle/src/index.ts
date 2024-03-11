import './style.css';

import { loginPage } from './components/loginPage/LoginPage';
import { PageState } from './services/State';

class App {
  render(state: PageState): void {
    state.setCurrentPage(loginPage);
  }
}

const pageParent = document.querySelector<HTMLElement>('body');

if (!pageParent) {
  throw new Error('PageParent os underfind');
}

const state = new PageState(pageParent);

const app: App = new App();

app.render(state);

export { state };
