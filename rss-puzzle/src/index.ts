import './style.css';

// import { loginPage } from './components/loginPage/LoginPage';
import { loginPage } from './components/loginPage/LoginPage';
// import { mainPage } from './components/mainPage/MainPage';
import { startPage } from './components/startPage/StartPage';
import { loginStatus } from './services/LocalStorage';
import { PageState } from './services/State';

class App {
  render(state: PageState): void {
    if (loginStatus.checkLoginStatus()) {
      state.setCurrentPage(startPage);
    } else {
      state.setCurrentPage(loginPage);
    }
  }
}

const pageParent = document.querySelector<HTMLElement>('body');

if (!pageParent) {
  throw new Error('PageParent is underfind');
}

const state = new PageState(pageParent);

const app: App = new App();

app.render(state);

export { state };
