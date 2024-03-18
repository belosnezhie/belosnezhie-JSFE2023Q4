import { BasicComponent } from '../BasicComponent';
import { logOutButton } from '../Buttons/LogOutButton';

class Header extends BasicComponent {
  constructor() {
    super(
      {
        tag: 'div',
        className: 'header',
      },
      logOutButton,
    );
  }
}

export const header = new Header();
