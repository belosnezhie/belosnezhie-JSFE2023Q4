import '../pages/AuthenticationPage.css';

import { AuthForm } from '../components/AuthForm';
import { BaseComponent } from '../components/Component';

export class AuthenticationPage extends BaseComponent {
  constructor() {
    const form = new AuthForm('AuthenticationForm');

    super(
      {
        tag: 'main',
        className: 'authentication_page',
      },
      form,
    );
  }
}
