import { ResponseMessageData, User } from '../types.ts/Types';

import { BaseComponent } from './Component';
import { Message } from './Message';
import { MessageForm } from './MessageForm';

export class DialogField extends BaseComponent {
  private userName: BaseComponent;
  private userStatus: BaseComponent;
  private messageForm: MessageForm;
  private dialog: BaseComponent;
  private userPlaceholder: BaseComponent;
  private historyPlaceholder: BaseComponent | undefined;

  constructor() {
    const userName = new BaseComponent({
      tag: 'p',
      className: 'dialog_user_name',
      text: 'User Name',
    });
    const userStatus = new BaseComponent({
      tag: 'p',
      className: 'dialog_user_status',
      text: 'User Status',
    });
    const usersInfoWrapper = new BaseComponent(
      {
        tag: 'div',
        className: 'users_info_wrapper',
      },
      userName,
      userStatus,
    );
    const dialog = new BaseComponent({
      tag: 'div',
      className: 'dialog',
    });
    const messageForm = new MessageForm('messageForm');

    const userPlaceholder = new BaseComponent({
      tag: 'div',
      className: 'dialog_placeholder',
      text: 'Select a user to send a message.',
    });

    super(
      {
        tag: 'div',
        className: 'dialog_field',
      },
      usersInfoWrapper,
      dialog,
      messageForm,
    );

    this.userName = userName;
    this.userStatus = userStatus;
    this.messageForm = messageForm;
    this.dialog = dialog;
    this.userPlaceholder = userPlaceholder;
    this.dialog.append(this.userPlaceholder);

    this.messageForm.addClass('disabled');
  }

  public setUserData(userData: User) {
    this.messageForm.removeClass('disabled');
    this.removeUserPlaceholder();

    this.userName.setTextContent(userData.login);
    if (userData.isLogined) {
      this.userStatus.setTextContent('Online');
    } else {
      this.userStatus.setTextContent('Offline');
    }
  }

  public renderMessage(message: ResponseMessageData) {
    const messageWrapper = new Message('message', message);

    if (this.historyPlaceholder) {
      this.dialog.removeChild(this.historyPlaceholder);
    }

    this.dialog.append(messageWrapper);

    this.scrollDialog();
  }

  public renderDialogHistory(dialogHistory: ResponseMessageData[]) {
    this.dialog.removeChildren();

    if (dialogHistory.length === 0) {
      this.dialog.append(this.showHistoryPlaceholder());
    }

    dialogHistory.forEach((item) => {
      this.renderMessage(item);
    });
  }

  public scrollDialog() {
    this.dialog.getElement().scrollTo({
      top: this.dialog.getElement().scrollHeight,
      behavior: 'smooth',
    });
  }

  public deleteMessage(id: string) {
    const message = this.findMessage(id);

    if (message) {
      this.dialog.removeChild(message);
    }
  }

  public editMessage(id: string, text: string, status: boolean = true) {
    const message = this.findMessage(id);

    if (message) {
      message.editMessage(text, status);
    }
  }

  private findMessage(id: string) {
    const messageHistoty = this.dialog.getChildren();
    const message: Message = <Message>(
      messageHistoty.find((item) => item.getAttribute('data-id') === id)
    );

    return message;
  }

  private showHistoryPlaceholder(): BaseComponent {
    const historyPlaceholder = new BaseComponent({
      tag: 'div',
      className: 'dialog_placeholder',
      text: 'You have no message history with this user...',
    });

    this.historyPlaceholder = historyPlaceholder;

    return historyPlaceholder;
  }

  private removeUserPlaceholder() {
    this.userPlaceholder.removeElement();
  }

  private showDevider(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      className: 'dialog_devider',
      text: 'New messages',
    });
  }
}
