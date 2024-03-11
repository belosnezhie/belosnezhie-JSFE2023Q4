import { BasicComponent } from '../BasicComponent';

class MainPage extends BasicComponent {
  constructor() {
    super({
      tag: 'div',
      className: 'main_page',
    });
  }
}

export const mainPage = new MainPage();
