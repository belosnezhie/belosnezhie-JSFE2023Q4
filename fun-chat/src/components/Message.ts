import { MessageStatus, ResponseMessageData } from '../types.ts/Types';

import { BaseComponent } from './Component';

export class Message extends BaseComponent {
  private status: BaseComponent | undefined;

  constructor(messageData: ResponseMessageData) {
    super({
      tag: 'div',
      className: 'message_container',
    });

    let messageProps: BaseComponent;

    if (messageData.type === 'sent') {
      messageProps = this.createSend(messageData);

      this.addClass('sent');
    } else {
      messageProps = this.createResived(messageData);

      this.addClass('received');
    }

    this.append(messageProps);

    const text: BaseComponent = this.createText(messageData);

    this.append(text);
  }

  private createText(message: ResponseMessageData): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      className: 'message',
      text: message.text,
    });
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

  private createTime(message: ResponseMessageData): BaseComponent {
    const receivedtime = new Date(message.datetime);
    const hours = receivedtime.getHours();
    const minutes = receivedtime.getMinutes();
    const seconds = receivedtime.getSeconds();
    const year = receivedtime.getFullYear();
    const month = receivedtime.getMonth();
    const day = receivedtime.getDate();

    const timeToRender = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;

    const time = new BaseComponent({
      tag: 'div',
      className: 'time',
      text: timeToRender,
    });

    return time;
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
}
