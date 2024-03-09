import './style.css';

// import { BasicComponent } from './components/BasicComponent';
// import { LoginPage } from './components/loginPage/LoginPage';
import { StartPage } from './components/startPage/StartPage';

class App {
  // loginPage: BasicComponent;

  // constructor() {
  //   this.loginPage = new BasicComponent({
  //     tag: 'div',
  //     className: 'pageWrapper',
  //   });
  // }

  render(parent: HTMLElement | null): void {
    if (parent) {
      parent.append(new StartPage().component);
    }
  }
}

const app: App = new App();

app.render(document.querySelector<HTMLElement>('body'));
