import { userEvent } from '../services/UsersEventEmmiter';
import {
  MessageStatus,
  ParamsToEmmit,
  ResponseMessageData,
} from '../types.ts/Types';

import { Button } from './Button';
import { BaseComponent } from './Component';
import { Form } from './Form';
import { Input } from './Input';
import { Textarea } from './Textarea';

export class Message extends Form {
  private status: BaseComponent | undefined;
  private editedStatus: BaseComponent | undefined;
  private statusValue: string | null = null;
  private type: string;
  private id: string;
  private messageContainer: Textarea;
  private widjets: BaseComponent | undefined = undefined;

  constructor(formName: string, messageData: ResponseMessageData) {
    super(formName);

    this.id = messageData.id;
    this.type = messageData.type;

    let messageProps: BaseComponent;

    if (messageData.type === 'sent') {
      messageProps = this.createSend(messageData);
      this.widjets = this.createWidgets(messageData.status.isEdited);

      this.addClass('sent');
    } else {
      messageProps = this.createResived(messageData);

      this.addClass('received');
    }

    this.append(messageProps);

    const text: Textarea = this.createText();

    this.setText(text, messageData.text);

    this.messageContainer = text;
    this.messageContainer.addClass('disabled');
    this.messageContainer.setAttribute('required', '');

    this.append(this.messageContainer);
    if (this.widjets) {
      this.append(this.widjets);
    }

    this.setAttribute('data-id', this.id);
    this.addClass('message_container');

    if (this.statusValue) {
      this.setAttribute('data-status', this.statusValue);
    }

    this.addListener('submit', (event: Event) => {
      event.preventDefault();
      const target: HTMLFormElement = event.target as HTMLFormElement;
      const name = target.elements[0] as HTMLTextAreaElement;
      const nameValue: string = name.value;

      const data: ParamsToEmmit = {
        id: this.id,
        text: nameValue,
      };

      userEvent.emit('userEditedMessage', data);
    });
  }

  public updateStatus(messageStatus: MessageStatus) {
    let statusValue: string = '';

    if (messageStatus.isDelivered) {
      statusValue = 'delivered';
    }

    if (messageStatus.isReaded) {
      statusValue = 'readed';
    }

    if (this.status) {
      this.status.setTextContent(statusValue);
    }
    this.statusValue = statusValue;
  }

  public setDeliveredStatus() {
    if (this.status) {
      this.status?.setTextContent('delivered');
    }
  }

  public editMessage(text: string) {
    this.messageContainer.setTextContent(text);
    this.messageContainer.addClass('disabled');

    if (this.type === 'received') {
      this.updateEditedStatus();

      return;
    }

    if (this.widjets) {
      this.widjets.removeElement();
    }
    this.widjets = this.createWidgets(true);
    this.append(this.widjets);
  }

  private setEditedStatus(): BaseComponent {
    return new BaseComponent({
      tag: 'p',
      className: 'edited_status',
    });
  }

  private updateEditedStatus() {
    if (this.editedStatus) {
      this.editedStatus.setTextContent('edited');
    }
  }

  private createText(): Textarea {
    return new Textarea('text', 'message-text', 'message');
  }

  private setText(textArea: Textarea, test: string) {
    textArea.setTextContent(test);
  }

  public setHeight() {
    this.messageContainer.setAttribute(
      'style',
      `height: ${this.messageContainer.getElement().scrollHeight}px`,
    );
  }

  public updateReadedStatus() {
    this.statusValue = 'readed';

    if (this.status) {
      this.status.setTextContent('readed');
    }
  }

  public destroyMessage() {
    this.getElement().innerHTML = '';
  }

  private createResived(message: ResponseMessageData) {
    const time = this.createTime(message);

    const from = new BaseComponent({
      tag: 'div',
      className: 'author',
      text: message.from,
    });

    const status = this.setEditedStatus();

    this.editedStatus = status;

    const recievedDataWrapper = new BaseComponent(
      {
        tag: 'div',
        className: 'recieved_data_wrapper',
      },
      time,
      from,
      status,
    );

    if (message.status.isEdited && this.editedStatus) {
      this.editedStatus.setTextContent('edited');
    }

    return recievedDataWrapper;
  }

  private createSend(message: ResponseMessageData) {
    const time = this.createTime(message);

    const to = new BaseComponent({
      tag: 'div',
      className: 'receiver',
      text: 'You',
    });

    const status = new BaseComponent({
      tag: 'div',
      className: 'status',
    });

    this.status = status;

    this.updateStatus(message.status);

    const sendDataWrapper = new BaseComponent(
      {
        tag: 'div',
        className: 'send_data_wrapper',
      },
      time,
      to,
      this.status,
    );

    return sendDataWrapper;
  }

  private createWidgets(isEdited: boolean): BaseComponent {
    const deleteButton = new Button('Delete', 'detete_message_button', () =>
      this.deleteMessage(),
    );
    const editButton = new Button('Edit', 'edit_message_button', () => {
      this.messageContainer.removeClass('disabled');
      this.messageContainer.getElement().focus();
      const saveButton = this.createSaveButton();

      if (this.widjets) {
        this.widjets.append(saveButton);

        this.widjets.removeChild(editButton);
      }
    });

    deleteButton.setAttribute('type', 'button');

    const widgetsWrapper = new BaseComponent(
      { tag: 'div', className: 'message_widjet_wrapper' },
      deleteButton,
      editButton,
    );

    if (isEdited) {
      const editStatus = this.setEditedStatus();

      widgetsWrapper.append(editStatus);
    }

    return widgetsWrapper;
  }

  private createTime(message: ResponseMessageData): BaseComponent {
    const receivedtime = new Date(message.datetime);
    const hours = receivedtime.getHours();
    const minutes = receivedtime.getMinutes();
    const seconds = receivedtime.getSeconds();
    const year = receivedtime.getFullYear();
    const month = 1 + receivedtime.getMonth();
    const day = receivedtime.getDate();

    const timeToRender = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;

    const time = new BaseComponent({
      tag: 'div',
      className: 'time',
      text: timeToRender,
    });

    return time;
  }

  private deleteMessage() {
    const id: ParamsToEmmit = this.id;

    userEvent.emit('userDeletedMessage', id);
  }

  private createSaveButton(): Input {
    return new Input('submit', 'submit_editing', 'save_button', 'Save');
  }
}
