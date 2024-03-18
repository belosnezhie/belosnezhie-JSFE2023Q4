import { state } from '../..';
import { loginStatus } from '../../services/LocalStorage';
import { loginPage } from '../loginPage/LoginPage';

import { Button } from './Button';

class LogOutButton extends Button {
  constructor() {
    super('', 'logOut_button', () => {
      loginStatus.clearLoginStatus();
      state.setCurrentPage(loginPage);
    });
  }
}

export const logOutButton = new LogOutButton();
