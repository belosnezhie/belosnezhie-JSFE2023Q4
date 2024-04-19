import { userEvent } from '../services/UsersEventEmmiter';
import { ParamsToEmmit, User } from '../types.ts/Types';

import { BaseComponent } from './Component';
import { Input } from './Input';

export class UsersList extends BaseComponent {
  private authUsers: User[] | undefined;
  private unAuthUsers: User[] | undefined;
  private searchInput: Input;
  private usersContainer: BaseComponent;

  constructor() {
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

    this.searchInput = searchInput;
    this.usersContainer = usersContainer;

    this.searchInput.setAttribute('placeholder', 'Find user...');

    this.addListener('click', (event: Event) => {
      const target: HTMLElement = <HTMLElement>event.target;

      const login: string | null = target.getAttribute('data_login');
      let isLogined: boolean | string | null =
        target.getAttribute('data_isLogined');

      if (isLogined === 'true') {
        isLogined = true;
      } else {
        isLogined = false;
      }

      const data: ParamsToEmmit = {
        isLogined: isLogined,
        login: login,
      };

      userEvent.emit('userWasSelected', data);
    });
  }

  public createUsersFields() {
    let users: User[] | [] = [];

    if (this.unAuthUsers && this.authUsers) {
      users = [...this.authUsers, ...this.unAuthUsers];
    }

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
        userField.setAttribute('data_isLogined', 'true');
      } else {
        status.addClass('un_logined');
        userField.setAttribute('data_isLogined', 'false');
      }

      userField.setAttribute('data_login', user.login);
      this.usersContainer.append(userField);
    });
  }

  public updateAuthUsers(authUsers: User[]) {
    this.authUsers = authUsers;

    this.usersContainer.removeChildren();

    this.createUsersFields();
  }

  public updateUNAuthUsers(UNauthUsers: User[]) {
    this.unAuthUsers = UNauthUsers;

    this.usersContainer.removeChildren();

    this.createUsersFields();
  }
}
