import { router } from '../controllers/Router';
import { validateForm } from '../services/Validation';
import { Pages } from '../types.ts/Types';

import { BaseComponent } from './Component';
import { Form } from './Form';
import { Input } from './Input';

enum ValidationFieldsProps {
  nameMinLength = '4',
  passwordMinLength = '6',
}

export class AuthForm extends Form {
  private nameInput: Input;
  private passwordInput: Input;
  private errorMessage: BaseComponent;

  constructor(formName: string) {
    const title = new BaseComponent({
      tag: 'h1',
      className: 'title',
      text: 'Authorization',
    });
    const nameInput = new Input('text', 'nameInput', 'name_input');
    const passwordInput = new Input('text', 'passwordInput', 'password_input');
    const submitInput = new Input(
      'submit',
      'submitInput',
      'submit_input',
      'Log in',
    );
    const errorMessage = new BaseComponent({
      tag: 'span',
      className: 'error_message',
    });

    nameInput.setAttribute('placeholder', 'Enter username');
    passwordInput.setAttribute('placeholder', 'Enter password');

    super(formName);

    this.append(title);
    this.append(nameInput);
    this.append(passwordInput);
    this.append(errorMessage);
    this.append(submitInput);

    this.nameInput = nameInput;
    this.passwordInput = passwordInput;
    this.errorMessage = errorMessage;

    this.addClass('authentication_form');
    this.setAttribute('novalidate', '');

    this.setInputProps();

    this.addListener('submit', (event: Event) => {
      event.preventDefault();
      const target: HTMLFormElement = event.target as HTMLFormElement;
      const name = target.elements[0] as HTMLInputElement;
      const nameValue: string = name.value;
      const password = target.elements[1] as HTMLInputElement;
      const passwordValue: string = password.value;

      const errorText: string | undefined = validateForm(
        nameValue,
        passwordValue,
      );

      if (errorText !== undefined) {
        this.showError(errorText);
      } else {
        router.navigate(Pages.main);
        console.log('UserData was send');
      }
    });
  }

  private setInputProps() {
    this.nameInput.setAttribute(
      'minlength',
      ValidationFieldsProps.nameMinLength,
    );
    this.nameInput.setAttribute('required', '');
    this.passwordInput.setAttribute(
      'minlength',
      ValidationFieldsProps.passwordMinLength,
    );
    this.passwordInput.setAttribute('required', '');
  }

  private showError(errorMessage: string) {
    this.errorMessage.setTextContent(errorMessage);
  }
}
