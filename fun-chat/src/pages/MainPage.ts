import './MainPage.css';
import { BaseComponent } from '../components/Component';
import { UsersList } from '../components/UsersField';
import { ParamsToEmmit, User } from '../types.ts/Types';

export class MainPage extends BaseComponent {
  private usersList: UsersList;

  constructor(authUsers: User[], unAuthUsers: User[]) {
    const usersList = new UsersList(authUsers, unAuthUsers);

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

  public updateAuthUsers(usersParams: ParamsToEmmit) {
    this.usersList.updateAuthUsers(usersParams);
  }
}
