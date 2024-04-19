import './MainPage.css';
import { BaseComponent } from '../components/Component';
import { DialogField } from '../components/DialogField';
import { UsersList } from '../components/UsersField';
import { User } from '../types.ts/Types';

export class MainPage extends BaseComponent {
  private usersList: UsersList;
  private dialogField: DialogField;

  constructor() {
    const usersList = new UsersList();
    const dialogField = new DialogField();

    super(
      {
        tag: 'main',
        className: 'main_page',
      },
      usersList,
      dialogField,
    );

    this.usersList = usersList;
    this.dialogField = dialogField;
  }

  public updateAuthUsers(authUsers: User[]) {
    this.usersList.updateAuthUsers(authUsers);
  }

  public updateUNAuthUsers(UNauthUsers: User[]) {
    this.usersList.updateUNAuthUsers(UNauthUsers);
  }

  public setSelectedUser(usersParams: User) {
    this.dialogField.setUserData(usersParams);
  }
}
