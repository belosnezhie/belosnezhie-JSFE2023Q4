import { router } from '../controllers/Router';
import { userEvent } from '../services/UsersEventEmmiter';
import { Pages, ParamsToEmmit } from '../types.ts/Types';

import { Button } from './Button';
import { BaseComponent } from './Component';

export class Header extends BaseComponent {
  private user: BaseComponent;

  constructor() {
    const user = new BaseComponent({
      tag: 'h2',
      className: 'user_title',
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
    const logOutButton = new Button('Log out', 'log_out_button', () => {
      const data: ParamsToEmmit = {};

      userEvent.emit('logoutUser', data);
    });
    const infoButton = new Button('Info', 'info_button', () => {
      router.navigate(Pages.about);
    });

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

    this.user = user;
  }

  public setUserName(name: string) {
    this.user.setTextContent(`User: ${name}`);
  }
}
