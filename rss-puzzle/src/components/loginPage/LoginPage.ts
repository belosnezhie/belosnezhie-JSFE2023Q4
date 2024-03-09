import './LoginPage.css';

import { BasicComponent } from '../BasicComponent';
import { Form } from '../form/Form';

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
        new Form(),
      ),
    );
  }
}
