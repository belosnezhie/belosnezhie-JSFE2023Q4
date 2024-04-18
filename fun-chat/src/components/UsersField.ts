import { User } from '../types.ts/Types';

import { BaseComponent } from './Component';
import { Input } from './Input';

export class UsersList extends BaseComponent {
  private authUsers: User[];
  private unAuthUsers: User[];
  private searchInput: Input;
  private usersContainer: BaseComponent;

  constructor(authUsers: User[], unAuthUsers: User[]) {
    const searchInput = new Input('text', 'search_input', 'search_input');
    const usersContainer = new BaseComponent({
      tag: 'div',
      className: 'users_container',
    });

    super(
      {
        tag: 'div',
        className: 'users_list',
      },
      searchInput,
      usersContainer,
    );

    this.authUsers = authUsers;
    this.unAuthUsers = unAuthUsers;
    this.searchInput = searchInput;
    this.usersContainer = usersContainer;

    this.searchInput.setAttribute('placeholder', 'Find user...');

    this.createAuthUsersFields(this.authUsers);
    this.createAuthUsersFields(this.unAuthUsers);
  }

  public createAuthUsersFields(users: User[]) {
    users.forEach((user) => {
      const status = new BaseComponent({
        tag: 'div',
        className: 'user_status',
      });
      const userName = new BaseComponent({
        tag: 'div',
        className: 'user_name',
        text: user.login,
      });
      const userField = new BaseComponent(
        {
          tag: 'div',
          className: 'user_field',
        },
        status,
        userName,
      );

      if (user.isLogined) {
        status.addClass('logined');
      } else {
        status.addClass('un_logined');
      }

      this.usersContainer.append(userField);
    });
  }
}
