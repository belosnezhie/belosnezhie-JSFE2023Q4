import './MainPage.css';
import { BaseComponent } from '../components/Component';
import { UsersList } from '../components/UsersField';
import { User } from '../types.ts/Types';

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
}
