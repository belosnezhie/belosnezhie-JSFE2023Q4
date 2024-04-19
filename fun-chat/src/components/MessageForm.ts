import { userEvent } from '../services/UsersEventEmmiter';
import { ParamsToEmmit } from '../types.ts/Types';

import { Form } from './Form';
import { Input } from './Input';

export class MessageForm extends Form {
  private messageInput: Input;
  private submitInput: Input;

  constructor(formName: string) {
    const messageInput = new Input(
      'text',
      'messageInput',
      'message_input',
      '',
      () => {
        this.submitInput.removeClass('disabled');
      },
    );
    const submitInput = new Input(
      'submit',
      'submitInput',
      'submit_input',
      'Send',
    );

    messageInput.setAttribute('placeholder', 'Type your message here...');

    super(formName);

    this.append(messageInput);
    this.append(submitInput);

    this.messageInput = messageInput;
    this.submitInput = submitInput;

    this.addClass('message_form');
    this.setAttribute('novalidate', '');
    this.submitInput.addClass('disabled');

    this.addListener('submit', (event: Event) => {
      event.preventDefault();
      const target: HTMLFormElement = event.target as HTMLFormElement;
      const input = target.elements[0] as HTMLInputElement;
      const message: ParamsToEmmit = input.value;

      userEvent.emit('messageWasSent', message);

      this.messageInput.setTextContent('');
      input.value = '';
    });
  }
}
