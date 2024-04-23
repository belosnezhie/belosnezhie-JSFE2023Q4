import '../pages/AuthenticationPage.css';

import { AuthForm } from '../components/AuthForm';
import { Button } from '../components/Button';
import { BaseComponent } from '../components/Component';
import { ModalWindow } from '../components/Modal';
import { router } from '../controllers/Router';
import { Pages } from '../types.ts/Types';

export class AuthenticationPage extends BaseComponent {
  constructor() {
    const form = new AuthForm('AuthenticationForm');

    const infoButton = new Button('Info', 'info_button', () => {
      router.navigate(Pages.about);
    });

    super(
      {
        tag: 'main',
        className: 'authentication_page',
      },
      form,
      infoButton,
    );
  }

  public showLoadModal() {
    const modal = new ModalWindow(
      'Oops! Server went down. We are trying to reconnect..',
    );

    this.append(modal);
  }
}
