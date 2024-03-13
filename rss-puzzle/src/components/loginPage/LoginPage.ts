import './LoginPage.css';

import { BasicComponent } from '../BasicComponent';
import { Form } from '../form/Form';
import { Headline } from '../Headline';

export class LoginPage extends BasicComponent {
  constructor() {
    super(
      {
        tag: 'div',
        className: 'login_page',
      },
      new BasicComponent(
        {
          tag: 'div',
          className: 'login_container',
        },
        new Headline('h2', 'login_header', 'Login to start learning!'),
        new Form(),
      ),
    );
  }
}

export const loginPage = new LoginPage();
