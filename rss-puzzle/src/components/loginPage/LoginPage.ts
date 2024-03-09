import './LoginPage.css';

import { BasicComponent } from '../BasicComponent';
import { Form } from '../form/Form';
import { Header } from '../Headers';

// const loginPage = new BasicComponent({
//   tag: 'div',
//   className: 'pageWrapper',
// });

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
        new Header('h2', 'login_header', 'Login to start learning!'),
        new Form(),
      ),
    );
  }
}
