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

export class MessageInput extends Form {
  private status: BaseComponent | undefined;
  private type: string;
  private id: string;
  private messageContainer: Input;
  private widjets: BaseComponent | undefined = undefined;

  constructor(formName: string, messageData: ResponseMessageData) {
    super(formName);

    this.id = messageData.id;
    this.type = messageData.type;

    let messageProps: BaseComponent;

    if (messageData.type === 'sent') {
      messageProps = this.createSend(messageData);
      this.widjets = this.createWidgets();

      this.addClass('sent');
    } else {
      messageProps = this.createResived(messageData);

      this.addClass('received');
    }

    this.append(messageProps);

    const text: Input = this.createText(messageData);

    this.messageContainer = text;
    this.messageContainer.addClass('disabled');
    this.messageContainer.setAttribute('required', '');

    this.append(this.messageContainer);
    if (this.widjets) {
      this.append(this.widjets);
    }

    this.setAttribute('data-id', this.id);
    this.addClass('message_container');

    this.addListener('submit', (event: Event) => {
      event.preventDefault();
      const target: HTMLFormElement = event.target as HTMLFormElement;
      const name = target.elements[0] as HTMLInputElement;
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

    if (messageStatus.isEdited) {
      statusValue = 'edited';
    }

    if (this.status) {
      this.status.setTextContent(statusValue);
    }
  }

  public editMessage(text: string, status: boolean = true) {
    this.messageContainer.setAttribute('value', text);
    this.messageContainer.addClass('disabled');

    if (this.type === 'received') {
      return;
    }

    if (this.widjets) {
      this.widjets.removeElement();
    }
    this.widjets = this.createWidgets();
    this.append(this.widjets);

    if (status && this.status) {
      this.status.setTextContent('edited');
    }
  }

  private createText(message: ResponseMessageData): Input {
    return new Input('text', 'message-text', 'message', message.text);
  }

  private createResived(message: ResponseMessageData) {
    const time = this.createTime(message);

    const from = new BaseComponent({
      tag: 'div',
      className: 'author',
      text: message.from,
    });

    const recievedDataWrapper = new BaseComponent(
      {
        tag: 'div',
        className: 'recieved_data_wrapper',
      },
      time,
      from,
    );

    return recievedDataWrapper;
  }

  private createSend(message: ResponseMessageData) {
    const time = this.createTime(message);

    const to = new BaseComponent({
      tag: 'div',
      className: 'receiver',
      text: message.to,
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

  private createWidgets(): BaseComponent {
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
