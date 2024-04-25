import './MainPage.css';
import { BaseComponent } from '../components/Component';
import { DialogField } from '../components/DialogField';
import { ModalWindow } from '../components/Modal';
import { UsersList } from '../components/UsersField';
import { ResponseMessageData, User } from '../types.ts/Types';

export class MainPage extends BaseComponent {
  private usersList: UsersList;
  private dialogField: DialogField;
  private modal: ModalWindow | undefined = undefined;

  constructor() {
    const usersList = new UsersList();
    const dialogField = new DialogField();

    super(
      {
        tag: 'main',
        className: 'main_page',
      },
      usersList,
    );

    this.usersList = usersList;
    this.dialogField = dialogField;

    this.append(this.dialogField);
  }

  public updateAuthUsers(authUsers: User[]) {
    this.usersList.updateAuthUsers(authUsers);
  }

  public updateUNAuthUsers(UNauthUsers: User[]) {
    this.usersList.updateUNAuthUsers(UNauthUsers);
  }

  public updateUser(user: User) {
    this.usersList.updateUser(user);
  }

  public setSelectedUser(usersParams: User) {
    this.dialogField.setUserData(usersParams);
  }

  public renderMessage(message: ResponseMessageData) {
    this.dialogField.renderMessage(message);
  }

  public renderDialogHistory(dialogHistory: ResponseMessageData[]) {
    if (dialogHistory.length === 0) {
      this.dialogField.showHistoryPlaceholder();
    }
    for (const messsage of dialogHistory) {
      this.renderMessage(messsage);
    }
  }

  public scrollDialog() {
    this.dialogField.scrollDialog();
  }

  public delivereMessage(id: string) {
    this.dialogField.delivereMessage(id);
  }

  public deleteMessage(id: string) {
    this.dialogField.deleteMessage(id);
  }

  public editMessage(id: string, text: string) {
    this.dialogField.editMessage(id, text);
  }

  public updateReadedMessage(id: string) {
    this.dialogField.updateReadedMessage(id);
  }

  public showLoadModal() {
    const modal = new ModalWindow(
      'Oops! Server went down. We are trying to reconnect..',
    );

    this.modal = modal;
    this.append(this.modal);
  }

  public removeModal() {
    if (this.modal) {
      this.modal.removeElement();
    }
  }

  public clearDialogHistory() {
    this.dialogField.clearHistory();
  }
}
