import '../pages/AuthenticationPage.css';

import { BaseComponent } from '../components/Component';
import { Form } from '../components/Form';

export class AuthenticationPage extends BaseComponent {
  constructor() {
    const form = new Form('AuthenticationForm');

    super(
      {
        tag: 'main',
        className: 'authentication_page',
      },
      form,
    );
  }
}
