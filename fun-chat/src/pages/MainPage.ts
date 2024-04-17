import './MainPage.css';
import { BaseComponent } from '../components/Component';

export class MainPage extends BaseComponent {
  constructor() {
    const usersField = new BaseComponent({
      tag: 'div',
      className: 'users_field',
      text: 'Users field.',
    });

    const dialogField = new BaseComponent({
      tag: 'div',
      className: 'dialog_field',
      text: 'Dialog field.',
    });

    super(
      {
        tag: 'main',
        className: 'main_page',
      },
      dialogField,
      usersField,
    );
  }
}
