import './MainPage.css';
import { BaseComponent } from '../components/Component';
import { UsersList } from '../components/UsersField';
import { User } from '../types.ts/Types';

export class MainPage extends BaseComponent {
  private usersList: UsersList;

  constructor() {
    const usersList = new UsersList();

    const dialogField = new BaseComponent({
      tag: 'div',
      className: 'dialog_field',
      text: 'Dialog field.',
    });

    super(
      {
        tag: 'main',
        className: 'main_page',
      },
      usersList,
      dialogField,
    );

    this.usersList = usersList;
  }

  public updateAuthUsers(authUsers: User[]) {
    this.usersList.updateAuthUsers(authUsers);
  }

  public updateUNAuthUsers(UNauthUsers: User[]) {
    this.usersList.updateUNAuthUsers(UNauthUsers);
  }
}
