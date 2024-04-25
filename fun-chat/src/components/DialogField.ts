import { userEvent } from '../services/UsersEventEmmiter';
import { ParamsToEmmit, ResponseMessageData, User } from '../types.ts/Types';

import { BaseComponent } from './Component';
import { Message } from './Message';
import { MessageForm } from './MessageForm';

export class DialogField extends BaseComponent {
  private userName: BaseComponent;
  private userStatus: BaseComponent;
  private messageForm: MessageForm;
  private dialog: BaseComponent;
  private userPlaceholder: BaseComponent;
  private historyPlaceholder: BaseComponent;

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
    );
    this.historyPlaceholder = new BaseComponent({
      tag: 'div',
      className: 'dialog_placeholder',
      text: 'You have no message history with this user...',
    });

    this.userName = userName;
    this.userStatus = userStatus;
    this.dialog = new BaseComponent({
      tag: 'div',
      className: 'dialog',
    });
    this.append(this.dialog);
    this.messageForm = new MessageForm('messageForm');
    this.append(this.messageForm);
    this.userPlaceholder = userPlaceholder;
    this.dialog.append(this.userPlaceholder);

    this.messageForm.addClass('disabled');

    this.dialog.addListener('click', (event: Event) => {
      const taget: HTMLElement = <HTMLElement>event.target;

      if (taget.classList.contains('detete_message_button')) {
        return;
      }
      this.collectReadedMessages();
    });
    this.dialog.addListener('wheel', () => {
      this.collectReadedMessages();
    });
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

    this.dialog.append(messageWrapper);

    this.scrollDialog();

    if (message.type === 'sent') {
      this.collectReadedMessages();
    }
  }

  public scrollDialog() {
    this.dialog.getElement().scrollTo({
      top: this.dialog.getElement().scrollHeight,
      behavior: 'smooth',
    });
  }

  public delivereMessage(id: string) {
    const message = this.findMessage(id);

    if (message) {
      message.setDeliveredStatus();
    }
  }

  public deleteMessage(id: string) {
    const message = this.findMessage(id);

    if (message) {
      this.dialog.removeChild(message);
    }
  }

  public editMessage(id: string, text: string) {
    const message = this.findMessage(id);

    if (message) {
      message.editMessage(text);
    }
  }

  public updateReadedMessage(id: string) {
    const message = this.findMessage(id);

    if (message) {
      message.updateReadedStatus();
    }
  }

  public clearHistory() {
    this.dialog.removeChildren();
    this.dialog.getElement().innerHTML = '';
  }

  private findMessage(id: string) {
    const messageHistoty = this.dialog.getChildren();
    const message: Message = <Message>(
      messageHistoty.find((item) => item.getAttribute('data-id') === id)
    );

    return message;

    // const messageHistoty = Array.from(this.dialog.getElement().children);
    // const message: Message = <Message>(
    //   messageHistoty.find((item) => item.getAttribute('data-id') === id)
    // );
    // const message: Message = <Message>(
    //   messageHistoty.find((item) => {
    //     itemHTML: HTMLElement = <HTMLElement>item;
    //     return itemHTML.getAttribute('data-id') === id;
    //   }
    // );

    // return message;
  }

  public showHistoryPlaceholder() {
    this.dialog.append(this.historyPlaceholder);
  }

  private removeUserPlaceholder() {
    this.userPlaceholder.removeElement();
  }

  private collectAllRecievedIDs(): string[] {
    const children = this.dialog.getChildren();
    const idArr: string[] = [];

    for (const item of children) {
      if (item.getElement().classList.contains('received')) {
        const id = item.getAttribute('data-id');

        if (id) {
          idArr.push(id);
        }
      }
    }

    return idArr;
  }

  private collectReadedMessages() {
    const idArr = this.collectAllRecievedIDs();

    const data: ParamsToEmmit = { idArr };

    if (idArr.length !== 0) {
      userEvent.emit('userReadMessage', data);
    }
  }

  private showDevider(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      className: 'dialog_devider',
      text: 'New messages',
    });
  }
}
