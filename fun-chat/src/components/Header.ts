import { Button } from './Button';
import { BaseComponent } from './Component';

export class Header extends BaseComponent {
  constructor(userName: string) {
    const user = new BaseComponent({
      tag: 'h2',
      className: 'user_title',
      text: `User: ${userName}`,
    });
    const title = new BaseComponent({
      tag: 'h1',
      className: 'header_title',
      text: 'Fun chat',
    });
    const buttonsContainer = new BaseComponent({
      tag: 'div',
      className: 'header_buttons_wrapper',
    });
    const logOutButton = new Button('Log out', 'log_out_button', () => {});
    const infoButton = new Button('Info', 'info_button', () => {});

    buttonsContainer.append(infoButton);
    buttonsContainer.append(logOutButton);

    super(
      {
        tag: 'header',
        className: 'main_heaader',
      },
      user,
      title,
      buttonsContainer,
    );
  }
}
