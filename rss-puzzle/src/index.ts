import './style.css';

// import { BasicComponent } from './components/BasicComponent';
import { LoginPage } from './components/loginPage/LoginPage';

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
      parent.append(new LoginPage().component);
    }
  }
}

const app: App = new App();

app.render(document.querySelector<HTMLElement>('body'));
