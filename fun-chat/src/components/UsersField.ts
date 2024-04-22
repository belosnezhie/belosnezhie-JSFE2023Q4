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
    const searchInput = new Input(
      'text',
      'search_input',
      'search_input',
      '',
      (event: Event) => {
        const target: HTMLInputElement = <HTMLInputElement>event.target;
        const value: string = target.value;

        this.usersContainer.getChildren().forEach((child) => {
          child.addClass('hidden');
        });

        const users = this.findUserName(value);

        users.forEach((user) => {
          user.getElement().parentElement?.classList.remove('hidden');
        });
      },
    );

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

    const usersWrappers: BaseComponent[] = users.map((user) => {
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

      return userField;
    });

    this.usersContainer.appendChildren(usersWrappers);
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

  public updateUser(user: User) {
    const name = user.login;

    console.log(name);
  }

  private findUserName(value: string) {
    const users: BaseComponent[] = this.usersContainer.getChildren();
    const userNames = users.map((user) => {
      const children: BaseComponent[] = user.getChildren();

      return children[1];
    });

    const filteredUsers = userNames.filter((user) => {
      return user.getElement().innerHTML.includes(value);
    });

    return filteredUsers;
  }
}
