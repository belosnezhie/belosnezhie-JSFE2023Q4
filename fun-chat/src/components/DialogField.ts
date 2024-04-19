import { BaseComponent } from './Component';
import { MessageForm } from './MessageForm';

export class DialogField extends BaseComponent {
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

    super(
      {
        tag: 'div',
        className: 'dialog_field',
      },
      usersInfoWrapper,
      dialog,
      messageForm,
    );
  }
}
